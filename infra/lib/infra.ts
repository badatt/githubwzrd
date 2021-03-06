import { BaseStack, HostedZone, Certificate } from '@badatt/infra-lib/build/dist';
import { StackProps, Construct, Duration, RemovalPolicy } from '@aws-cdk/core';
import { ARecord, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget, ApiGatewayv2Domain } from '@aws-cdk/aws-route53-targets';
import { Bucket, BlockPublicAccess, ObjectOwnership } from '@aws-cdk/aws-s3';
import {
  Distribution,
  OriginAccessIdentity,
  LambdaEdgeEventType,
  ViewerProtocolPolicy,
  CachePolicy,
} from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { Code, Runtime, Function } from '@aws-cdk/aws-lambda';
import { EdgeFunction } from '@aws-cdk/aws-cloudfront/lib/experimental';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Effect, PolicyStatement, ArnPrincipal } from '@aws-cdk/aws-iam';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { DomainName, HttpApi, HttpMethod, CorsPreflightOptions, CorsHttpMethod } from '@aws-cdk/aws-apigatewayv2';

export class InfraStack extends BaseStack {
  projectName: string;
  rootDomain: string;
  targetEnv: string;
  hostedZone: HostedZone;
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    this.targetEnv = scope.node.tryGetContext('targetEnv');
    this.rootDomain = scope.node.tryGetContext('rootDomain');
    this.projectName = scope.node.tryGetContext('project');

    this.hostedZone = new HostedZone(this, 'HostedZone', {
      domainName: this.rootDomain,
    });

    /**
     * Dynamodb table storage
     */

    const userTable = new Table(this, 'UserTable', {
      tableName: `${this.projectName}-user`,
      partitionKey: {
        name: 'Id',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'Org',
        type: AttributeType.STRING,
      },
    });

    /**
     * Deploying web application
     */

    const webAuthLambda = new EdgeFunction(this, 'WebAuthLambda', {
      functionName: `${this.projectName}-web-auth`,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      description: `${this.rootDomain} cloudfront edge lambda`,
      code: Code.fromAsset('lambda/cookie-authorizer'),
      timeout: Duration.seconds(5),
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.DESTROY,
      },
    });

    userTable.grantReadWriteData(webAuthLambda);

    const lambdaPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['secretsmanager:GetSecretValue', 'cloudfront:ListKeyGroups'],
      resources: ['*'],
    });

    webAuthLambda.addToRolePolicy(lambdaPolicy);

    const webApplicationCertificate = new Certificate(this, 'WebApplicationCertificate', {
      domainName: this.rootDomain,
      hostedZone: this.hostedZone.zone,
      validate: true,
    });

    const webDeploymentBucket = new Bucket(this, 'AppDeploymentBucket', {
      bucketName: this.rootDomain,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      objectOwnership: ObjectOwnership.BUCKET_OWNER_PREFERRED,
    });

    const githubDroidAccessPolicy = new PolicyStatement({
      actions: ['s3:DeleteObject*', 's3:PutObject', 's3:Abort*', 's3:ListBucket', 's3:PutObjectAcl'],
      effect: Effect.ALLOW,
      principals: [new ArnPrincipal('arn:aws:iam::261778676253:user/github-droid')],
      resources: [webDeploymentBucket.bucketArn, `${webDeploymentBucket.bucketArn}/*`],
    });

    webDeploymentBucket.addToResourcePolicy(githubDroidAccessPolicy);

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `OAI for ${this.rootDomain}`,
    });

    const s3Origin = new S3Origin(webDeploymentBucket, {
      originAccessIdentity: originAccessIdentity,
    });

    const cloudfrontS3Access = new PolicyStatement({
      actions: ['s3:GetBucket*', 's3:GetObject*', 's3:List*'],
      resources: [webDeploymentBucket.bucketArn, `${webDeploymentBucket.bucketArn}/*`],
    });

    cloudfrontS3Access.addCanonicalUserPrincipal(originAccessIdentity.cloudFrontOriginAccessIdentityS3CanonicalUserId);

    webDeploymentBucket.addToResourcePolicy(cloudfrontS3Access);

    const distribution = new Distribution(this, 'CloudfrontWebDistribution', {
      defaultBehavior: {
        origin: s3Origin,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: webAuthLambda.currentVersion,
          },
        ],
        cachePolicy: CachePolicy.CACHING_DISABLED,
      },
      certificate: webApplicationCertificate.certificate,
      domainNames: [this.rootDomain],
      comment: `${this.rootDomain} web app`,
      defaultRootObject: 'index.html',
      errorResponses: [
        {
          httpStatus: 404,
          responsePagePath: '/index.html',
          responseHttpStatus: 200,
        },
      ],
    });

    new ARecord(this, 'CloudfrontWebDistributionAliasRecord', {
      zone: this.hostedZone.zone,
      recordName: this.rootDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
    this.api();
  }

  api = () => {
    const certificate = new Certificate(this, 'ApiCertificate', {
      domainName: `api.${this.rootDomain}`,
      hostedZone: this.hostedZone.zone,
      validate: true,
    });

    const domainName = new DomainName(this, 'ApiDomain', {
      domainName: `api.${this.rootDomain}`,
      certificate: certificate.certificate,
    });

    const httpApi = new HttpApi(this, `${this.projectName}Api`, {
      apiName: this.projectName,
      defaultDomainMapping: {
        domainName: domainName,
      },
      description: `${this.projectName} API`,
      corsPreflight: {
        allowCredentials: true,
        allowHeaders: ['*'],
        allowMethods: [CorsHttpMethod.ANY],
        allowOrigins: [`https://${this.rootDomain}`],
        exposeHeaders: ['*'],
        maxAge: Duration.minutes(5),
      },
    });
    this.routes({
      httpApi: httpApi,
      routes: ['repos', 'me', 'docs', 'pulls'],
    });

    new ARecord(this, 'ApiAliasRecord', {
      zone: this.hostedZone.zone,
      recordName: `api.${this.rootDomain}`,
      target: RecordTarget.fromAlias(new ApiGatewayv2Domain(domainName)),
    });
  };

  routes = (props: { httpApi: HttpApi; routes: string[] }) => {
    props.routes.forEach((route) => {
      const lf = new Function(this, `Lambda${route}`, {
        functionName: `${this.projectName}-${route}`,
        code: Code.fromAsset('lambda/bootstrap'),
        runtime: Runtime.NODEJS_14_X,
        handler: 'index.handler',
        environment: {
          USER_TABLE: 'githubwzrd-user',
          JWT_SECRET: '{{resolve:secretsmanager:GithubwzrdCookieAuthorizerCrypto:SecretString:PUBLIC_KEY}}',
          NODE_ENV: this.targetEnv,
        },
        timeout: Duration.minutes(15),
      });

      lf.addPermission('droid-access', {
        principal: new ArnPrincipal('arn:aws:iam::261778676253:user/github-droid'),
        action: 'lambda:UpdateFunctionCode',
      });

      const lambdaPolicy = new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['secretsmanager:GetSecretValue', 'cloudfront:ListKeyGroups', 'dynamodb:*'],
        resources: ['*'],
      });

      lf.addToRolePolicy(lambdaPolicy);
      const repoLambdaIntegration = new LambdaProxyIntegration({
        handler: lf,
      });

      props.httpApi.addRoutes({
        path: `/${route}/{proxy+}`,
        methods: [HttpMethod.ANY],
        integration: repoLambdaIntegration,
      });

      props.httpApi.addRoutes({
        path: `/${route}`,
        methods: [HttpMethod.ANY],
        integration: repoLambdaIntegration,
      });
    });
  };
}

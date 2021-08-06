import { BaseStack, HostedZone, Certificate } from '@badatt/infra-lib/build/dist';
import { StackProps, Construct, SecretValue, Duration, PhysicalName, RemovalPolicy } from '@aws-cdk/core';
import { ARecord, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Bucket, BlockPublicAccess, BucketAccessControl } from '@aws-cdk/aws-s3';
import { Distribution, OriginAccessIdentity, LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { Code, Runtime, Function } from '@aws-cdk/aws-lambda';
import { EdgeFunction } from '@aws-cdk/aws-cloudfront/lib/experimental';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { LambdaProxyIntegration } from '@aws-cdk/aws-apigatewayv2-integrations';
import { HttpApi, HttpMethod } from '@aws-cdk/aws-apigatewayv2';

export class InfraStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const targetEnv = scope.node.tryGetContext('targetEnv');
    const rootDomain = scope.node.tryGetContext('rootDomain');
    const project = scope.node.tryGetContext('project');

    const hostedZone = new HostedZone(this, 'HostedZone', {
      domainName: rootDomain,
    });

    /**
     * Dynamodb table storage
     */

    const userTable = new Table(this, 'UserTable', {
      tableName: `${project}-user`,
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
      functionName: `${project}-web-auth`,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      description: `${rootDomain} cloudfront edge lambda`,
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
      domainName: rootDomain,
      hostedZone: hostedZone.zone,
      validate: true,
    });

    const webDeploymentBucket = new Bucket(this, 'AppDeploymentBucket', {
      bucketName: rootDomain,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      accessControl: BucketAccessControl.BUCKET_OWNER_FULL_CONTROL,
    });

    const originAccessIdentity = new OriginAccessIdentity(this, 'OriginAccessIdentity', {
      comment: `OAI for ${rootDomain}`,
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
        edgeLambdas: [
          {
            eventType: LambdaEdgeEventType.VIEWER_REQUEST,
            functionVersion: webAuthLambda.currentVersion,
          },
        ],
      },
      certificate: webApplicationCertificate.certificate,
      domainNames: [rootDomain],
      comment: `${rootDomain} web app`,
      defaultRootObject: 'index.html',
    });

    new ARecord(this, 'CloudfrontWebDistributionAliasRecord', {
      zone: hostedZone.zone,
      recordName: rootDomain,
      target: RecordTarget.fromAlias(new CloudFrontTarget(distribution)),
    });
    this.api();
  }

  api = () => {
    const repoLambda = new Function(this, 'RepoLambda', {
      functionName: `repo`,
      code: Code.fromAsset('.func-api'),
      runtime: Runtime.NODEJS_14_X,
      handler: 'index.handler',
      environment: {
        USER_TABLE: 'githubwzrd-user',
        JWT_SECRET: '{{resolve:secretsmanager:GithubwzrdCookieAuthorizerCrypto:SecretString:PUBLIC_KEY}}',
        NODE_ENV: 'sbx',
      },
    });
    const lambdaPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['secretsmanager:GetSecretValue', 'cloudfront:ListKeyGroups', 'dynamodb:*'],
      resources: ['*'],
    });

    repoLambda.addToRolePolicy(lambdaPolicy);
    const repoLambdaIntegration = new LambdaProxyIntegration({
      handler: repoLambda,
    });

    const httpApi = new HttpApi(this, 'ReposApi');

    httpApi.addRoutes({
      path: '/repos',
      methods: [HttpMethod.ANY],
      integration: repoLambdaIntegration,
    });
  };
}

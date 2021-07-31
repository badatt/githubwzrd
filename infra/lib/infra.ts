import { BaseStack, HostedZone, Certificate } from '@badatt/infra-lib/build/dist';
import { StackProps, Construct, SecretValue, Duration, PhysicalName, RemovalPolicy } from '@aws-cdk/core';
import { ARecord, RecordTarget } from '@aws-cdk/aws-route53';
import { CloudFrontTarget } from '@aws-cdk/aws-route53-targets';
import { Bucket, BlockPublicAccess, BucketAccessControl } from '@aws-cdk/aws-s3';
import { Distribution, OriginAccessIdentity, LambdaEdgeEventType } from '@aws-cdk/aws-cloudfront';
import { S3Origin } from '@aws-cdk/aws-cloudfront-origins';
import { Code, Runtime } from '@aws-cdk/aws-lambda';
import { EdgeFunction } from '@aws-cdk/aws-cloudfront/lib/experimental';
import { AttributeType, Table } from '@aws-cdk/aws-dynamodb';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';

export class InfraStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const targetEnv = scope.node.tryGetContext('targetEnv');
    const rootDomain = scope.node.tryGetContext('rootDomain');

    const hostedZone = new HostedZone(this, 'HostedZone', {
      domainName: rootDomain,
    });

    /*
    const clientId = SecretValue.secretsManager('Githubwzrd', {
      jsonField: 'ClientId',
    });
    const clientSecret = SecretValue.secretsManager('Githubwzrd', {
      jsonField: 'ClientSecret',
    });
    const userPoolDomainName = `auth.${rootDomain}`;
    const callbackUrls = [`https://${rootDomain}`];
    const logoutUrls = [`https://${rootDomain}`];

    if (targetEnv === 'sbx') {
      callbackUrls.push('http://localhost:3000');
      logoutUrls.push('http://localhost:3000');
    }

    const userPoolDomainCertificate = new Certificate(this, 'UserPoolDomainCertificate', {
      domainName: userPoolDomainName,
      hostedZone: hostedZone.zone,
      validate: true,
    });

    // User pool
    const userPool = new UserPool(this, 'UserPool');

    // Hosted UI with custom domain
    const userPoolDomain = userPool.addDomain('UserPoolCustomDomain', {
      customDomain: {
        certificate: userPoolDomainCertificate.certificate,
        domainName: userPoolDomainName,
      },
    });

    new ARecord(this, 'UserPoolCustomDomainAliasRecord', {
      zone: hostedZone.zone,
      recordName: userPoolDomainName,
      target: RecordTarget.fromAlias(new UserPoolDomainTarget(userPoolDomain)),
    });

    const userPoolIdentityProviderGithub = new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
      userPool,
      clientId: clientId.toString(),
      clientSecret: clientSecret.toString(),
      cognitoHostedUiDomain: `https://${userPoolDomainName}`,
    });

    const userPoolClient = userPool.addClient('UserPoolClient', {
      oAuth: {
        callbackUrls,
        logoutUrls,
      },
      supportedIdentityProviders: [
        UserPoolClientIdentityProvider.COGNITO,
        UserPoolClientIdentityProvider.custom('Github'),
      ],
    });
    userPoolClient.node.addDependency(userPoolIdentityProviderGithub);
    */

    /**
     * Dynamodb table storage
     */

    const userTable = new Table(this, 'UserTable', {
      tableName: 'UserTable',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'org',
        type: AttributeType.STRING,
      },
    });

    const userSessionTable = new Table(this, 'UserSessionTable', {
      tableName: 'UserSessionTable',
      partitionKey: {
        name: 'id',
        type: AttributeType.STRING,
      },
      sortKey: {
        name: 'org',
        type: AttributeType.STRING,
      },
    });

    /**
     * Deploying web application
     */

    const cloudfrontHttpRedirectLambda = new EdgeFunction(this, 'CloudfrontHttpRedirectLambda', {
      functionName: PhysicalName.GENERATE_IF_NEEDED,
      runtime: Runtime.NODEJS_12_X,
      handler: 'index.handler',
      description: `${rootDomain} cloudfront edge lambda`,
      code: Code.fromAsset('lambda/cookie-authorizer'),
      timeout: Duration.seconds(5),
      currentVersionOptions: {
        removalPolicy: RemovalPolicy.RETAIN,
      },
    });

    userTable.grantReadWriteData(cloudfrontHttpRedirectLambda);
    userSessionTable.grantReadWriteData(cloudfrontHttpRedirectLambda);

    const lambdaPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['secretsmanager:GetSecretValue', 'cloudfront:ListKeyGroups'],
      resources: ['*'],
    });

    cloudfrontHttpRedirectLambda.addToRolePolicy(lambdaPolicy);

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
            functionVersion: cloudfrontHttpRedirectLambda.currentVersion,
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
  }
}

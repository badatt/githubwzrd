import { BaseStack, HostedZone, Certificate } from '@badatt/infra-lib/build/dist';
import { StackProps, Construct, SecretValue } from '@aws-cdk/core';
import { DnsValidatedCertificate, CertificateValidation } from '@aws-cdk/aws-certificatemanager';
import { UserPool, UserPoolClientIdentityProvider, UserPoolDomain } from '@aws-cdk/aws-cognito';
import { ARecord, RecordTarget } from '@aws-cdk/aws-route53';
import { UserPoolDomainTarget } from '@aws-cdk/aws-route53-targets';
import { UserPoolIdentityProviderGithub } from './user-pool-identity-provider-github';

// Parameters
//const userPoolDomainName = "https://auth.domain.com";
//const callbackUrls = ["https://www.domain.com"];
//const logoutUrls = ["https://www.domain.com"];
//const githubClientId = 'githubClientId';
//const githubClientSecret = 'githubClientSecret';

// Based on https://github.com/scenario-labs/cdk-user-pool-identity-provider-github

export class InfraStack extends BaseStack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const targetEnv = scope.node.tryGetContext('targetEnv');
    const rootDomain = scope.node.tryGetContext('rootDomain');
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

    const hostedZone = new HostedZone(this, 'HostedZone', {
      domainName: rootDomain,
    });

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

    // Github identity provider
    const userPoolIdentityProviderGithub = new UserPoolIdentityProviderGithub(this, 'UserPoolIdentityProviderGithub', {
      userPool,
      clientId: clientId.toString(),
      clientSecret: clientSecret.toString(),
      cognitoHostedUiDomain: `https://${userPoolDomainName}`,
    });

    // User pool client
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
  }
}

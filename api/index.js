const serverless = require('serverless-http');
const express = require('express');
const { Octokit } = require('@octokit/rest');

const { getSecretValue, getUserSession } = require('./src/aws.js');

const app = express();

app.get('/', async function (req, res) {
  const oauthCreds = await getSecretValue('GithubwzrdOauthAppCreds');
  const cryptoKeys = await getSecretValue('GithubwzrdCookieAuthorizerCrypto');
  const userSession = await getUserSession('43672979', 'messybun');
  const octokit = new Octokit({
    auth: userSession.GitToken.S,
  });
  const repos = await octokit.repos.listForOrg({ org: 'messybun' });
  res.send(repos);
});

module.exports.handler = serverless(app);
exports.app = app;

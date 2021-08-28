let { task, desc } = require('jake');
const fs = require('fs-extra');
const shell = require('shelljs');
const dotenv = require('dotenv');
const path = require('path');

task('explain', function () {
  console.log(`

  ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗ ██╗    ██╗███████╗██████╗ ██████╗ 
 ██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗██║    ██║╚══███╔╝██╔══██╗██╔══██╗
 ██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝██║ █╗ ██║  ███╔╝ ██████╔╝██║  ██║
 ██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗██║███╗██║ ███╔╝  ██╔══██╗██║  ██║
 ╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝╚███╔███╔╝███████╗██║  ██║██████╔╝
  ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═════╝ 
                                                                                 
  `);
});

task('init', ['explain'], function () {
  dotenv.config({
    path: path.join(__dirname, '.aws.env'),
  });
});

desc('Build API project');
task('build-api-dev', ['init'], function () {
  shell.cd('./api');
  shell.exec('yarn');
  shell.cd('../');
});

desc('Run API in dev mode in local');
task('run-api-dev', ['build-api-dev'], function () {
  shell.cd('./api');
  shell.exec('yarn dev-server');
});

desc('Build Client project');
task('build-client-dev', ['init'], function () {
  shell.cd('./client');
  shell.exec('yarn');
  shell.cd('../');
});

desc('Run Client in dev mode in local');
task('run-client-dev', ['build-client-dev'], function () {
  shell.cd('./client');
  shell.exec('yarn dev-server');
});

desc('Deploy infrastructure in sbx');
task('cdk-sbx', ['init'], async function () {
  shell.cd('./infra');
  shell.cp('./sbx.lambda-auth.config', './lambda/cookie-authorizer/config.js');
  fs.writeFileSync('lambda/cookie-authorizer/.versions.json', JSON.stringify({ date: new Date() }));
  shell.cp('cdk.sbx.json', 'cdk.json');
  shell.exec('npx cdk deploy sbx-githubwzrd --require-approval never -c targetEnv=sbx');
  shell.cd('../');
});

desc('Deploy infrastructure in prod');
task('cdk-prd', ['init'], async function () {
  shell.cd('./infra');
  shell.cp('./prd.lambda-auth.config', './lambda/cookie-authorizer/config.js');
  fs.writeFileSync('lambda/cookie-authorizer/.versions.json', JSON.stringify({ date: new Date() }));
  shell.cp('cdk.prd.json', 'cdk.json');
  shell.exec('npx cdk deploy prd-githubwzrd --require-approval never -c targetEnv=prd');
  shell.cd('../');
});

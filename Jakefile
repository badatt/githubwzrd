let { task, desc } = require('jake');
const fs = require('fs-extra');
const shell = require('shelljs');
const dotenv = require('dotenv');
const path = require('path');

const rootDir = __dirname;

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
  shell.cd(path.join(rootDir, './api'));
  shell.exec('yarn');
});

desc('Run API in dev mode in local');
task('run-api-dev', ['build-api-dev'], function () {
  shell.cd(path.join(rootDir, './api'));
  shell.exec('yarn dev-server');
});

desc('Build Client project');
task('build-client-dev', ['init'], function () {
  shell.cd(path.join(rootDir, './client'));
  shell.exec('yarn');
});

desc('Run Client in dev mode in local');
task('run-client-dev', ['build-client-dev'], function () {
  shell.cd(path.join(rootDir, './client'));
  shell.exec('yarn dev-server');
});

desc('Prepare cookie authorizer lambda');
task('prepare-cookie-authorizer-lambda-function', function () {
  shell.cd(path.join(rootDir, './infra/lambda/cookie-authorizer'));
  shell.exec('yarn');
});

desc('Deploy infrastructure in sbx');
task('cdk-sbx', ['init', 'prepare-cookie-authorizer-lambda-function'], async function () {
  shell.cd(path.join(rootDir, './infra'));
  shell.cp('./sbx.lambda-auth.config.js', './lambda/cookie-authorizer/config.js');
  fs.writeFileSync('lambda/cookie-authorizer/.versions.json', JSON.stringify({ date: new Date() }));
  shell.cp('cdk.sbx.json', 'cdk.json');
  shell.exec('npx cdk deploy sbx-githubwzrd --require-approval never -c targetEnv=sbx');
});

desc('Deploy infrastructure in prod');
task('cdk-prd', ['init', 'prepare-cookie-authorizer-lambda-function'], async function () {
  shell.cd(path.join(rootDir, './infra'));
  shell.cp('./prd.lambda-auth.config.js', './lambda/cookie-authorizer/config.js');
  fs.writeFileSync('lambda/cookie-authorizer/.versions.json', JSON.stringify({ date: new Date() }));
  shell.cp('cdk.prd.json', 'cdk.json');
  shell.exec('npx cdk deploy prd-githubwzrd --require-approval never -c targetEnv=prd');
});

let { task, desc } = require("jake");
const fs = require("fs-extra");
const shell = require("shelljs");
const dotenv = require("dotenv");
const path = require("path");

task("explain", function () {
  console.log(`

  ██████╗ ██╗████████╗██╗  ██╗██╗   ██╗██████╗ ██╗    ██╗███████╗██████╗ ██████╗ 
 ██╔════╝ ██║╚══██╔══╝██║  ██║██║   ██║██╔══██╗██║    ██║╚══███╔╝██╔══██╗██╔══██╗
 ██║  ███╗██║   ██║   ███████║██║   ██║██████╔╝██║ █╗ ██║  ███╔╝ ██████╔╝██║  ██║
 ██║   ██║██║   ██║   ██╔══██║██║   ██║██╔══██╗██║███╗██║ ███╔╝  ██╔══██╗██║  ██║
 ╚██████╔╝██║   ██║   ██║  ██║╚██████╔╝██████╔╝╚███╔███╔╝███████╗██║  ██║██████╔╝
  ╚═════╝ ╚═╝   ╚═╝   ╚═╝  ╚═╝ ╚═════╝ ╚═════╝  ╚══╝╚══╝ ╚══════╝╚═╝  ╚═╝╚═════╝ 
                                                                                 
  `);
});

task("init", ["explain"], function () {
  dotenv.config({
    path: path.join(__dirname, ".aws.env"),
  });
});

desc("Build API project");
task("build-api-dev", ["init"], function () {
  shell.cd("./api");
  shell.exec("yarn");
  shell.cd("../");
});

desc("Run API in dev mode in local");
task("run-api-dev", ["build-api-dev"], function () {
  shell.cd("./api");
  shell.exec("yarn dev-server");
});

desc("Build Client project");
task("build-client-dev", ["init"], function () {
  shell.cd("./client");
  shell.exec("yarn");
  shell.cd("../");
});

desc("Run Client in dev mode in local");
task("run-client-dev", ["build-client-dev"], function () {
  shell.cd("./client");
  shell.exec("yarn dev-server");
});

desc("Buid API project for serverless deployment");
task("build-api-serverless", ["init"], function () {
  try {
    fs.removeSync("./infra/.func-api");
    fs.mkdirsSync("./infra/.func-api");
    fs.copySync("./api/src", "./infra/.func-api", {
      filter: function (p) {
        return !p.startsWith("node_modules");
      },
    });
    fs.copySync("./api/package.json", "./infra/.func-api/package.json");
    shell.cd("./infra/.func-api");
    shell.exec("yarn");
    shell.cd("../../");
  } catch (err) {
    console.error(err);
  }
});

desc("Deploy infrastructure in sbx");
task("cdk-sbx", ["build-api-serverless"], async function () {
  shell.cd("./infra");
  shell.cp("cdk.sbx.json", "cdk.json");
  shell.exec("npx cdk deploy sbx-githubwzrd -c targetEnv=sbx ");
  shell.cd("../");
});

let { task, desc } = require("jake");
const fs = require("fs-extra");
const shell = require("shelljs");

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

task("init", ["explain"], function () {});

desc("Buid API project for serverless deployment");
task("build-api-serverless", ["init"], function () {
  try {
    fs.removeSync("./infra/.func-api");
    fs.mkdirsSync("./infra/.func-api");
    fs.copySync("./api/src", "./infra/.func-api", {
      filter: function (path) {
        return !path.startsWith("node_modules");
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
});

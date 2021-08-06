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
    const packageJsonFile = fs.readJsonSync("./infra/.func-api/package.json");
    delete packageJsonFile.devDependencies;
    const dependencies = packageJsonFile.dependencies;
    Object.keys(dependencies).forEach((d) => {
      if (d.startsWith("@aws-sdk")) delete dependencies[d];
    });
    fs.writeJsonSync("./infra/.func-api/package.json", packageJsonFile, {
      spaces: 4,
    });
    shell.cd("./infra/.func-api");
    shell.exec("yarn");
  } catch (err) {
    console.error(err);
  }
});

desc("Deploy infrastructure in sbx");
task("cdk-sbx", function () {
  shell.cd("./infra");
  shell.exec("yarn cdk-sbx");
});

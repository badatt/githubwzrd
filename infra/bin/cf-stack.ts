#!/usr/bin/env node
import "source-map-support/register";
import { App } from "@aws-cdk/core";
import { InfraStack } from "../lib/infra";

const app = new App();

const env = {
  account: app.node.tryGetContext("account"),
  region: app.node.tryGetContext("region"),
};

const targetEnv = app.node.tryGetContext("targetEnv");

new InfraStack(app, `${targetEnv}-githubwzrd`, {
  description: "Githubwzrd application stack",
  stackName: `${targetEnv}-githubwzrd`,
  env: env,
});

app.synth();

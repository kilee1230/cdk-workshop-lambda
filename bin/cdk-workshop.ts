#!/opt/homebrew/opt/node/bin/node
import * as cdk from "aws-cdk-lib";

import { CdkWorkshopStack } from "../lib/cdk-workshop-stack";

const app = new cdk.App();
new CdkWorkshopStack(app, "CdkWorkshopStack", {
  stackName: "cdk-workshop-lambda",
});

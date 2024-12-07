import * as cdk from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";

import { CdkWorkshopStack } from "../lib/cdk-workshop-stack";

test("S3 Bucket Created", () => {
  const app = new cdk.App();
  const stack = new CdkWorkshopStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  template.resourceCountIs("AWS::S3::Bucket", 1);
});

test("BucketDeployment Created", () => {
  const app = new cdk.App();
  const stack = new CdkWorkshopStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("Custom::CDKBucketDeployment", {
    SourceBucketNames: Match.anyValue(),
    DestinationBucketName: Match.anyValue(),
    SourceObjectKeys: Match.anyValue(),
  });
});

test("Lambda Function Created", () => {
  const app = new cdk.App();
  const stack = new CdkWorkshopStack(app, "MyTestStack");
  const template = Template.fromStack(stack);

  template.hasResourceProperties("AWS::Lambda::Function", {
    Handler: "index.handler",
    Runtime: "nodejs22.x",
    MemorySize: 256,
    Timeout: 60,
  });
});

test("Snapshot Test", () => {
  const app = new cdk.App();
  const stack = new CdkWorkshopStack(app, "MyTestStack");

  const template = Template.fromStack(stack);

  expect(template.toJSON()).toMatchSnapshot();
});

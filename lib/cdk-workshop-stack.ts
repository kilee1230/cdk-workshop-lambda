import { Duration, Stack, StackProps } from "aws-cdk-lib";
import { Fn } from "aws-cdk-lib";
import { Tags } from "aws-cdk-lib";
import { Code, Function, Runtime } from "aws-cdk-lib/aws-lambda";
import { Bucket } from "aws-cdk-lib/aws-s3";
import { BucketDeployment, Source } from "aws-cdk-lib/aws-s3-deployment";
import { Construct } from "constructs";

export class CdkWorkshopStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    // Define an S3 bucket
    const lambdaBucket = new Bucket(this, "LambdaTestHello");

    // Determine the source directory based on the environment variable
    const sourceDir = process.env.SOURCE_DIR || "./src";

    // Deploy the Lambda code to the S3 bucket
    const lambdaCodeAsset = new BucketDeployment(
      this,
      "LambdaCodeAssetDeployment",
      {
        sources: [Source.asset(sourceDir)],
        destinationBucket: lambdaBucket,
        exclude: ["**/*.ts"],
        extract: false,
      },
    );

    // Reference the uploaded Lambda code
    const lambdaCode = Code.fromBucket(
      lambdaCodeAsset.deployedBucket,
      Fn.select(0, lambdaCodeAsset.objectKeys),
    );

    // Define an AWS Lambda resource
    const helloFunction = new Function(this, "HelloHandler", {
      runtime: Runtime.NODEJS_22_X,
      code: lambdaCode,
      handler: "index.handler",
      memorySize: 256,
      timeout: Duration.seconds(60),
    });

    // Add tagging to the resources
    Tags.of(lambdaBucket).add("demo:label", "cdk-workshop");
    Tags.of(helloFunction).add("demo:label", "cdk-workshop");
  }
}

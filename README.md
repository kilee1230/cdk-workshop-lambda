# CDK Workshop

This project is based on the AWS CDK workshop available at [AWS CDK Workshop](https://catalog.us-east-1.prod.workshops.aws/workshops/10141411-0192-4021-afa8-2436f3c66bd8/en-US/100-getting-started).

## Setup

1. **Install dependencies:**

   ```sh
   pnpm install
   ```

2. **Configure AWS CLI:**

   ```sh
   aws configure
   ```

3. **Build the project:**

   ```sh
   pnpm build
   ```

## Deployment

1. **Bootstrap the environment (if not already done):**

   ```sh
   pnpm bootstrap
   ```

2. **Deploy the stack:**

   ```sh
   pnpm deploy
   ```

   This command will build the project and deploy the stack to your AWS account.

## Lambda Function

The Lambda function is defined in [index.ts](http://_vscodecontentref_/4):

```typescript
import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  event: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! You've hit ${event.path}\n`,
  };
};
```

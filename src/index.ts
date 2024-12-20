import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";

export const handler = async (
  _: APIGatewayProxyEvent
): Promise<APIGatewayProxyResult> => {
  // console.log("request:", JSON.stringify(event, undefined, 2));
  return {
    statusCode: 200,
    headers: { "Content-Type": "text/plain" },
    body: `Hello, CDK! Testing lambda 123`,
  };
};

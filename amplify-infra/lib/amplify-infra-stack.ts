// Package Imports
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

// Local Imports
import { CognitoUserStack } from "./cognito-user-stack";
import { ApiGateway } from "./ApiGateway";
import { S3Bucket } from "./S3Bucket";
import { Dynamo } from "./Dynamo";
import { Lambda } from "./Lambda";

export class AmplifyInfraStack extends cdk.Stack {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // setup repo pipeline later
    // https://aws.amazon.com/blogs/mobile/deploying-a-static-website-with-aws-amplify-and-cdk/

    // initialize Cognito User Pool
    // const userPoolStack = new CognitoUserStack(this, 'AgenticAssistantAiUserPool');

    // const userPoolId = cdk.Fn.importValue("UserPoolId");
    // const userPoolClientId = cdk.Fn.importValue("UserPoolClientId");

    // initialize API Gateway
    const api = new ApiGateway(this, "AgenticAssistantAiApi", {
      restApiName: "AgenticAssistantAiApi",
      description: "This is the Agentic Assistant AI API",
      defaultCorsPreflightOptions: {
        allowOrigins: ["http://localhost:3000"],
        allowMethods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
        allowHeaders: ["*"],
      },
      deployOptions: {
        stageName: "dev",
      },
    });

    this.apiUrl = api.url;
  }
}

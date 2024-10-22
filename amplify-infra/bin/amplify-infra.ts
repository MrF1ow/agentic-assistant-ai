#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as amplify from "aws-cdk-lib/aws-amplify";
import { AmplifyInfraStack } from "../lib/amplify-infra-stack";
import { CognitoUserStack } from "../lib/cognito-user-stack";
import { NextHostingStack } from "../lib/next-hosting-stack";

const app = new cdk.App();

const CognitoStack = new CognitoUserStack(app, "CognitoUserStack", {
  env: { account: "211125505645", region: "us-west-2" },
});

const InfraStack = new AmplifyInfraStack(app, "AmplifyInfraStack", {
  env: { account: "211125505645", region: "us-west-2" },
});

// creation of amplify application
const amplifyNextHostingStack = new NextHostingStack(
  app,
  "AgenticAssistantAiApp",
  {
    githubOAuthToken: 'github-token',
    owner: "MrF1ow",
    repository: "agentic-assistant-ai",
    environmentVariables: {
      USER_POOL_ID: CognitoStack.userPool.userPoolId,
      USER_POOL_CLIENT_ID: CognitoStack.userPoolClient.userPoolClientId,
      API_URL: InfraStack.apiUrl,
    },
  }
);

/* Uncomment the next line to specialize this stack for the AWS Account
 * and Region that are implied by the current CLI configuration. */
// env: { account: process.env.CDK_DEFAULT_ACCOUNT, region: process.env.CDK_DEFAULT_REGION },

/* Uncomment the next line if you know exactly what Account and Region you
 * want to deploy the stack to. */
// env: { account: '123456789012', region: 'us-east-1' },

/* For more information, see https://docs.aws.amazon.com/cdk/latest/guide/environments.html */

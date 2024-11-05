#!/usr/bin/env node
import "source-map-support/register";
import * as cdk from "aws-cdk-lib";
import * as amplify from "aws-cdk-lib/aws-amplify";
import { AmplifyInfraStack } from "../lib/amplify-infra-stack";
import { CognitoUserStack } from "../lib/cognito-user-stack";
import { NextHostingStack } from "../lib/next-hosting-stack";

const app = new cdk.App();

const env = { account: "211125505645", region: "us-west-2" };

const CognitoStack = new CognitoUserStack(app, "CognitoUserStack", { env });

const InfraStack = new AmplifyInfraStack(app, "AmplifyInfraStack", { env });

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
    env,
  }
);

amplifyNextHostingStack.addDependency(CognitoStack);
amplifyNextHostingStack.addDependency(InfraStack);

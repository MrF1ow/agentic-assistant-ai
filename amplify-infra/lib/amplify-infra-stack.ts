// Package Imports
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import {
  Role,
  ServicePrincipal,
  PolicyStatement,
  ManagedPolicy,
} from "aws-cdk-lib/aws-iam";

// Local Imports
import { ApiGateway } from "./ApiGateway";
import { Dynamo } from "./Dynamo";
import { Lambda } from "./Lambda";
import { S3Bucket } from "./S3Bucket";

export class AmplifyInfraStack extends cdk.Stack {
  public readonly apiUrl: string;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // initialize the DynamoDB table for storing chat conversations
    const conversationsTable = new Dynamo(
      this,
      "ConversationsTable",
      "conversations",
      "chatId"
    );

    // create a lambda execution role with permissions to read from the DynamoDB table
    const conversationLambdaRole = new Role(this, "LambdaDynamoDBRole", {
      assumedBy: new ServicePrincipal("lambda.amazonaws.com"),
      managedPolicies: [
        ManagedPolicy.fromAwsManagedPolicyName(
          "service-role/AWSLambdaBasicExecutionRole"
        ),
      ],
    });

    conversationLambdaRole.addToPolicy(
      new PolicyStatement({
        actions: [
          "dynamodb:Query",
          "dynamodb:GetItem",
          "dynamodb:Scan",
          "bedrock:InvokeModel",
          "bedrock:ListModels",
        ],
        // restrict access to the conversations ONLY
        resources: [conversationsTable.tableArn, "*"],
      })
    );

    const bedrockLambda = new Lambda(
      this,
      "BedrockInteractionLambda",
      "interactWithBedrock",
      conversationLambdaRole
    );

    // create a lambda function to retrieve the chat histories from the DynamoDB table
    const getConversationsLambda = new Lambda(
      this,
      "GetConversationsLambda",
      "getConversations",
      conversationLambdaRole
    );
    conversationsTable.grantReadData(getConversationsLambda);

    getConversationsLambda.addEnvironment(
      "CONVERSATIONS_TABLE_NAME",
      conversationsTable.tableName
    );

    bedrockLambda.addEnvironment(
      "BEDROCK_ENDPOINT",
      "bedrock-runtime.amazonaws.com"
    );

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

    api.addIntegration("GET", "conversations", getConversationsLambda);
    api.addIntegration("POST", "bedrock", bedrockLambda);

    this.apiUrl = api.url;
  }
}

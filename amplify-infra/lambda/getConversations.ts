import { DynamoDB } from "aws-sdk";

const dynamoDb = new DynamoDB.DocumentClient();
const tableName = process.env.CONVERSATIONS_TABLE_NAME || "";

export const handler = async (event: any) => {
  try {
    const params = {
      TableName: tableName,
    };

    // fetch all conversations from the DynamoDB table
    const data = await dynamoDb.scan(params).promise();
    return {
      statusCode: 200,
      body: JSON.stringify(data.Items),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};

import * as AWS from "aws-sdk";

export const handler = async (event: any) => {
//   return {
//     statusCode: 200,
//     body: JSON.stringify({ message: "Hello from Bedrock!" }),
//   };
    const bedrock = new AWS.BedrockRuntime({ region: "us-west-2" });

    const params = {
      modelId: "meta.llama3-1-405b-instruct-v1:0",
      body: JSON.stringify({ inputText: event.body.inputText }),
      contentType: "application/json",
    };

    try {
      const response = await bedrock.invokeModel(params).promise();

      const responseBody = JSON.parse(response.body?.toString() || "{}");

      return {
        statusCode: 200,
        body: JSON.stringify(responseBody),
      };
    } catch (error) {
      const err = error as Error;
      return {
        statusCode: 500,
        body: JSON.stringify({
          error: err.message,
          message: "An error occurred",
        }),
      };
    }
};

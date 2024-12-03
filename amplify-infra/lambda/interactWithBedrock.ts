import * as AWS from "aws-sdk";

exports.handler = async (event: any) => {
  const bedrock = new AWS.BedrockRuntime({ region: "us-west-2" });

  const requestBody = JSON.parse(event.body);

  const params = {
    modelId: "meta.llama3-1-405b-instruct-v1:0",
    body: JSON.stringify({
      prompt: requestBody.prompt,
      max_gen_len: requestBody.max_gen_len,
      temperature: requestBody.temperature,
      top_p: requestBody.top_p,
    }),
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
      }),
    };
  }
};

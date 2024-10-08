// Copyright Amazon.com, Inc. or its affiliates. All Rights Reserved.
// SPDX-License-Identifier: Apache-2.0
const {
  BedrockRuntimeClient,
  InvokeModelCommand,
} = require('@aws-sdk/client-bedrock-runtime')

const sendRequestToReceive = async (request) => {
  const { prompt, knowBaseId } = request
  if(!prompt) {
    return null
  }
  console.log("=".repeat(35));
  console.log("Welcome to the Amazon Bedrock demo!");
  console.log("=".repeat(35));
  console.log("Model: Anthropic Claude 3 Haiku");
  console.log(`Prompt: ${prompt}\n`);
  console.log("Invoking model...\n");
  // Create a new Bedrock Runtime client instance.
  const client = new BedrockRuntimeClient({ 
    region: process.env.AWS_REGION,
    apiVersion: process.env.AWS_API_VERSION,
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? ''
    }
});

  // Prepare the payload for the model.
  const payload = {
    anthropic_version: process.env.ANTHROPIC_VERSION,
    max_tokens: Number(process.env.MAX_TOKENS),
    messages: [{ role: "user", content: [{ type: "text", text: prompt }] }],
  };

  const input = {
    contentType: "application/json",
    accept: '*/*',
    body: JSON.stringify(payload),
    modelId: process.env.AWS_MODEL_ID,
  }
  
  // Invoke Claude with the payload and wait for the response.
  const apiResponse = await client.send(
    new InvokeModelCommand(input),
  );

  // Decode and return the response(s)
  const decodedResponseBody = new TextDecoder().decode(apiResponse.body);
  /** @type {ResponseBody} */
  const responseBody = JSON.parse(decodedResponseBody);
  const responses = responseBody.content;

  // TODO: PINTARLO EN EL FRONT
  /*if (responses.length === 1) {
    console.log(`Response: ${responses[0].text}`);
  } else {
    console.log("Haiku returned multiple responses:");
    console.log(responses);
  }*/

  console.log(`\nNumber of input tokens:   ${responseBody.usage.input_tokens}`);
  console.log(`Number of output tokens: ${responseBody.usage.output_tokens}`);
  return responses;
}

module.exports = {
  sendRequestToReceive
}
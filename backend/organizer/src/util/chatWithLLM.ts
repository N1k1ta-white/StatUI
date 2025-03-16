import { OpenAI } from "openai";
import * as process from "node:process";
import {z} from "zod";
import { zodResponseFormat } from 'openai/helpers/zod';

const openai = new OpenAI({
  baseURL: `${process.env.OPEN_AI_URL ?? "https://oddly-skilled-cicada.ngrok-free.app"}/v1`, // LM Studio API endpoint
  apiKey: "sk-no-key-required", // LM Studio doesn't need a key, but OpenAI SDK requires this field
});

export async function chatWithLLM(message: string, structure: any) {
  const params: any = {
    model: "meta-llama-3.1-8b-instruct", // e.g., "mistral", "llama3"
    messages: [{ role: "system", content: "You are a helpful statistic and data science assistant." }, 
               { role: "user", content: message }],
    max_tokens: 200,
  };

  if (structure) {
    params.response_format = zodResponseFormat(structure, "structure_extraction")
  }
  
  const response = await openai.chat.completions.create(params);

  console.log(response.choices[0]?.message?.content); // log the AI's response

  return response.choices[0]?.message?.content // return the AI's response
}
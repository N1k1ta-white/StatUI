import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import { OpenAI } from "openai";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

const openai = new OpenAI({
  baseURL: `${import.meta.env.VITE_OPEN_AI_URL ?? "https://oddly-skilled-cicada.ngrok-free.app"}/v1`,
  apiKey: "sk-no-key-required", // LM Studio doesn't need a key, but OpenAI SDK requires this field
  dangerouslyAllowBrowser: true
});

export async function chatWithLLM(message: string) {
  const response = await openai.chat.completions.create({
    model: "meta-llama-3.1-8b-instruct", // e.g., "mistral", "llama3"
    messages: [{ role: "system", content: "You are a helpful statistic and data science assistant." },
      { role: "user", content: message }],
    max_tokens: 200
  });

  return response.choices[0]?.message?.content // return the AI's response
}

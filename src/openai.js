import OpenAI from "openai";
import { config } from "./config.js";

const openai = new OpenAI({
  apiKey: config.openaiApiKey,
  baseURL: config.openaiBaseUrl,
  defaultHeaders: {
    "HTTP-Referer": config.baseUrl || "",
    "X-Title": "agency-exec-ai-bot",
  },
});

export async function askAssistant({
  systemPrompt,
  userMessage,
  contextText = "",
}) {
  const input = [
    {
      role: "system",
      content: systemPrompt,
    },
    {
      role: "user",
      content: contextText
        ? `${userMessage}\n\nКонтекст из документов:\n${contextText}`
        : userMessage,
    },
  ];

  const response = await openai.responses.create({
    model: config.openaiModel,
    input,
  });

  return response.output_text || "Не удалось получить ответ от модели.";
}

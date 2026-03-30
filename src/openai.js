import OpenAI from "openai";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  baseURL: process.env.OPENAI_BASE_URL || "https://api.openai.com/v1",
  defaultHeaders: {
    "HTTP-Referer": process.env.BASE_URL || "",
    "X-Title": "agency-exec-ai-bot"
  }
});

export async function askAssistant({ systemPrompt, userPrompt }) {
  const response = await openai.responses.create({
    model: config.openAiModel,
    instructions: systemPrompt,
    input: userPrompt,
  });

  return response.output_text?.trim() || 'Не удалось получить ответ от модели.';
}

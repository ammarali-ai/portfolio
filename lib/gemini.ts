import { GoogleGenerativeAI } from "@google/generative-ai";

export function getGemini() {
  const key = process.env.GOOGLE_GENERATIVE_AI_API_KEY;
  if (!key) return null;
  return new GoogleGenerativeAI(key);
}

export function getChatModel() {
  const client = getGemini();
  if (!client) return null;
  return client.getGenerativeModel({ model: "gemini-1.5-flash" });
}

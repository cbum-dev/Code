import { GoogleGenerativeAI } from "@google/generative-ai";

// Define types for chat history
type ChatMessage = {
  role: "user" | "model";
  parts: { text: string }[];
};

// Initialize chatHistory with proper typing
const chatHistory: ChatMessage[] = [];

async function main(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key is not defined");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 500,
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    // Update chat history
    chatHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });
    chatHistory.push({
      role: "model",
      parts: [{ text }], // shorthand when property matches variable name
    });
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}

export default main;

export async function codeSnippet(prompt: string): Promise<string> {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key is not defined");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const chat = model.startChat({
      history: chatHistory,
      generationConfig: {
        maxOutputTokens: 8129,
        responseMimeType: "application/json"
      },
    });

    const result = await chat.sendMessage(prompt);
    const response = await result.response;
    const text = response.text();

    chatHistory.push({
      role: "user",
      parts: [{ text: prompt }],
    });
    chatHistory.push({
      role: "model",
      parts: [{ text }],
    });
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}
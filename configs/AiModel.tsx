import { GoogleGenerativeAI } from "@google/generative-ai";

let chatHistory = []; 



async function main(prompt: string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key is not defined");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" }); // Use a model suitable for chat

    const chat = model.startChat({
      history: chatHistory, 
      generationConfig: {
        maxOutputTokens: 500,
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
      parts: [{ text: text }],
    });
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}

export default main;


export async function codeSnippet(prompt: string) {
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
      parts: [{ text: text }],
    });
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}
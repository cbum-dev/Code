import { GoogleGenerativeAI } from "@google/generative-ai";

async function main(prompt:string) {
  try {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
    if (!apiKey) throw new Error("Gemini API key is not defined");
    
    const genAI = new GoogleGenerativeAI(apiKey);
    
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.0-flash" // Using stable model name
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();
    
    return text;
  } catch (error) {
    console.error("Error in Gemini API:", error);
    throw error;
  }
}

export default main;
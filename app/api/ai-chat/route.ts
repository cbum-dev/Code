
import main from "@/configs/AiModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        
        // Extract the actual prompt text from the messages
        let promptText = "";
        if (typeof prompt === 'string') {
            try {
                const messages = JSON.parse(prompt);
                if (Array.isArray(messages) && messages.length > 0) {
                    // Get the last user message
                    const lastMessage = messages[messages.length - 1];
                    promptText = lastMessage?.content || prompt;
                } else {
                    promptText = prompt;
                }
            } catch {
                promptText = prompt;
            }
        } else {
            promptText = prompt;
        }

        const result = await main(promptText);
        
        return new Response(JSON.stringify({ result }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
            },
        });
    } catch (error ) {
        console.error("Error in AI chat route:", error);
        return new Response(JSON.stringify({ 
            error: "Failed to generate response",
            details: error instanceof Error ? error.message : 'An unknown error occurred'
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json",
            },
        });
    }
}
import { codeSnippet } from "@/configs/AiModel";
import { NextRequest } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { prompt } = await req.json();
        const ChatReact = `Generate a Project in React, Create multiple components, organizing th

Return the response in JSON format with the following schema:
{
    "projectTitle": "",
    "explanation": "",
    "files": {
        "/App.js": {
            "code": ""&
        },
        ...
    },
    "generatedFiles": []
}

Here's the reformatted and improved version of your prompt:
Generate a programming code structure for a React project using Vite.

Return the response in JSON format with the following schema:

json
Copy code
{
    "projectTitle": "",
    "explanation": "",
    "files": {
        "/App.js": {
            "code": ""
        },
        ...
    },
    "generatedFiles": []
}
    Ensure the files field contains all created files, and the generatedFi
files:{
    "/App.js": {
        "code", "import React from 'react';\nimport './styles.css';\nexport
    }
}
    Additionally, include an explanation of the project's structure, pur
- For placeholder images, please use a https://archive.org/download/
-Add Emoji icons whenever needed to give good user experience
- The lucide-react library is also available to be imported IF NECO
',


}`;
        let promptText = "" ;
        if (typeof prompt === 'string') {
            try {
                const messages = JSON.parse(prompt);
                if (Array.isArray(messages) && messages.length > 0) {
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

        const result = await codeSnippet(promptText+ChatReact);
        
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
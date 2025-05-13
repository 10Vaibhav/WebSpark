import * as dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
dotenv.config();

// It Automatically Set API Key From Environment
const anthropic = new Anthropic();

async function main() {
    const msg = await anthropic.messages.create({
        model: "claude-3-7-sonnet-20250219",
        max_tokens: 20000,
        temperature: 1,
        messages: [{
            role: "user",
            content: "What is 2 + 2"
        }]
    });
    console.log(msg);
}

main();

import * as dotenv from "dotenv";
import Anthropic from "@anthropic-ai/sdk";
dotenv.config();

// It Automatically Set API Key From Environment
const anthropic = new Anthropic();

async function main() {
    anthropic.messages.stream({
    messages: [{role: 'user', content: "Create a simple todo app"}],
    model: 'claude-3-7-sonnet-20250219',
    max_tokens: 1024,
}).on('text', (text) => {
    console.log(text);
});
}

main();

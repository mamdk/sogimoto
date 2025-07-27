import { OpenAI } from 'openai'

if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not defined in .env file");
}

export default new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

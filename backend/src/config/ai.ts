import { OpenAI } from 'openai'
import generateError from "../utils/generate_error";
import * as console from "console";

if (!process.env.OPENAI_API_KEY) {
    console.error("OPENAI_API_KEY is not defined in .env file");
}

export default new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

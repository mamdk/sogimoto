import { OpenAI } from 'openai'
import generateError from "../utils/generate_error";

// TODO
// if (!process.env.OPENAI_API_KEY) {
//     generateError("OPENAI_API_KEY is not defined in .env file");
// }

export default new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

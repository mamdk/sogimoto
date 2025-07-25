import openai from "../config/ai";
import generateError from "../utils/generate_error";

interface SummaryOptions {
    max_tokens?: number;
    temperature?: number;
    model?: string;
}

async function summarizeWithAI(
    product: Record<string, string | number>,
    reviews: Record<string, string | number>[] | null,
    mood: 'product' | 'reviews',
    options: SummaryOptions = {}
): Promise<string> {
    try {
        const {
            max_tokens = 150,
            temperature = 0.7,
            model = "gpt-3.5-turbo",
        } = options;

        const response = await openai.chat.completions.create({
            model,
            messages: [
                {
                    role: "system",
                    content: "You are a shopping assistant that summarizes information.",
                },
                {
                    role: "user",
                    content: mood === 'product' ?
                        `Write a summary for me about a product with the following specifications. Just give the summary.:\n${product}`
                        :
                        `Write a summary for me about the following reviews and ratings related to a product with the specifications:\n${product}
                    .Just give the summary of the reviews, ratings, and your own purchase recommendation.\n\n${reviews}`,
                },
            ],
            max_tokens,
            temperature,
        });

        const summary = response.choices[0]?.message?.content;
        if (!summary) {
            generateError("No summary was generated")
        }

        return summary;
    } catch (err) {
        generateError(err)
    }
}

export default summarizeWithAI
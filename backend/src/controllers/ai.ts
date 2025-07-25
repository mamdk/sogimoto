import generateError from "../utils/generate_error";
import getProduct from "../utils/get_product";
import supabase from '../config/db'
import summarizeWithAI from "../utils/ai_summary";
import aiValidator from "../validator/ai";

async function aiSummary(req, res) {
    try {
        const { productId, mood } = req.body;

        const errors = await aiValidator(req)
        if(errors) {
            return res.status(400).json({ errors });
        }

        const product = await getProduct(productId)
        let summary = ''

        if(mood === 'product') {
            summary = await summarizeWithAI(product, null,'product')
        } else if(mood === 'reviews') {
            const { data: reviewsData, error:reviewsError } = await supabase
                .from('product_reviews')
                .select('*')
                .order('random()')
                .eq('product_id', productId)
                .limit(10);

            if (reviewsError) {
                generateError(reviewsError.message)
            }

            summary = await summarizeWithAI(product, reviewsData,'reviews')
        }

        res.status(200).json({ productId, mood, summary });
    } catch (err) {
        generateError(err);
    }
}

export default aiSummary
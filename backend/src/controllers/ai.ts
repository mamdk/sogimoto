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
        delete product.id
        delete product.image

        let summary = ''

        if(mood === 'product') {
            summary = await summarizeWithAI(product, null,'product')
        } else if(mood === 'reviews') {
            const limit = 10

            const { data: reviewsIDs, error: reviewsIDsError } = await supabase
                .from('product_reviews')
                .select('id')
                .eq('product_id', productId)

            if (reviewsIDsError) {
                generateError(reviewsIDsError.message)
            }

            if(reviewsIDs.length > 0) {
                const selectedIDs = reviewsIDs.sort(() => Math.random() - 0.5).map(({id}) => id).slice(0, limit)

                const { data: reviewsData, error: reviewsError } = await supabase
                    .from('product_reviews')
                    .select('*')
                    .eq('product_id', productId)
                    .in('id', selectedIDs)

                if (reviewsError) {
                    generateError(reviewsError.message)
                }

                summary = await summarizeWithAI(product, reviewsData,'reviews')
            }
        }

        res.status(200).json({ productId, mood, summary });
    } catch (err) {
        generateError(err);
    }
}

export default aiSummary
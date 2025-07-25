import supabase from "../config/db";

const updateProductRating = async (productId: string) => {
    const { data, error } = await supabase
        .from('product_reviews')
        .select('rating')
        .eq('product_id', productId);

    if (!error && data.length > 0) {
        const avgRating = data.reduce((sum, review) => sum + review.rating, 0) / data.length;
        await supabase
            .from('products')
            .update({ rating: avgRating.toFixed(1), count: data.length })
            .eq('id', productId);
    }
};

export default updateProductRating
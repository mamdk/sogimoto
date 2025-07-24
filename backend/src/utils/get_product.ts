import supabase from "../config/db";
import generateError from "./generate_error";

async function getProduct(id: number | string) {
    const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

    if (error) {
        generateError(error.message)
    }

    if(!data) {
        generateError('Not Found', 404, 'NOT_FOUND')
    }

    return data
}

export default getProduct
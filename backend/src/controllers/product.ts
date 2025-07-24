import {Request, Response, NextFunction} from 'express';
import generateError from "../utils/generate_error";
import getProduct from "../utils/get_product";
import supabase from "../config/db";
import reviewValidator from "../validator/review";
import updateProductRating from "../utils/update_product_raating";

export async function product(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const data  = await getProduct(id)

        res.json(data);
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}

export async function reviews(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { page = '1', limit = '10' } = req.query;

        const pageNumber = parseInt(page as string, 10);
        const limitNumber = parseInt(limit as string, 10);
        const offset = (pageNumber - 1) * limitNumber;

        const { data: reviews, error, count } = await supabase
            .from('product_reviews')
            .select('*', { count: 'exact' })
            .eq('product_id', id)
            .range(offset, offset + limitNumber - 1)
            .order('created_at', { ascending: false });

        if (error) {
            generateError(error.message)
        }

        if(!reviews) {
            generateError('Not Found', 404, 'NOT_FOUND')
        }

        res.json({
            reviews,
            total: count,
            page: pageNumber,
            totalPages: Math.ceil((count || 0) / limitNumber),
        });
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}

export async function createReview(req: Request, res: Response, next: NextFunction) {
    try {
        const { comment, rate, productId } = req.body;

        const errors = await reviewValidator(req)
        if(errors) {
            return res.status(400).json({ errors });
        }

        const { data, error } = await supabase
            .from('product_reviews')
            .insert([{ product_id: productId, rate, text: comment }])
            .select();

        if (error) {
            return generateError(error.message)
        }

        await updateProductRating(productId)

        res.status(201).json(data[0]);
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}
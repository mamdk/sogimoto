import {Request, Response, NextFunction} from 'express';
import generateError from "../utils/generate_error";
import getProduct from "../utils/get_product";
import supabase from "../config/db";

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
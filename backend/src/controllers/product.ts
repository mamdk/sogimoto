import {Request, Response, NextFunction} from 'express';
import generateError from "../utils/generate_error";
import getProduct from "../utils/get_product";
import supabase from "../config/db";
import reviewValidator from "../validator/review";
import updateProductRating from "../utils/update_product_raating";
import pagination from "src/utils/pagination";

export async function product(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const data  = await getProduct(id)

        res.status(200).json(data);
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}

export async function products(req: Request, res: Response, next: NextFunction) {
    try {
        const { page, limit } = req.query;

        const {offset, limitNumber, pageNumber} = pagination(page, limit)

        const { data: products, error, count } = await supabase
            .from('products')
            .select('*', { count: 'exact' })
            .range(offset, offset + limitNumber - 1)
            .order('created_at', { ascending: false });

        if (error || !products) {
            generateError(error.message, 404, 'NOT_FOUND')
        }

        res.status(200).json({
            products,
            total: count,
            page: pageNumber,
            totalPages: Math.ceil((count || 0) / limitNumber),
        });
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}

export async function reviews(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;
        const { page = '1', limit = '10' } = req.query;

        const {offset, limitNumber, pageNumber} = pagination(page, limit)

        const { data: reviews, error, count } = await supabase
            .from('product_reviews')
            .select('*', { count: 'exact' })
            .eq('product_id', id)
            .range(offset, offset + limitNumber - 1)
            .order('created_at', { ascending: false });

        if(error || !reviews) {
            generateError('Not Found', 404, 'NOT_FOUND')
        }

        res.status(200).json({
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
        const { comment, rating } = req.body;
        const { id: productId } = req.params;

        const errors = await reviewValidator(req)
        if(errors) {
            return res.status(400).json({ errors });
        }

        const { data, error } = await supabase
            .from('product_reviews')
            .insert([{ product_id: productId, rating, text: comment }])
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
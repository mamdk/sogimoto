import {Request, Response, NextFunction} from 'express';
import generateError from "../utils/generate_error";
import getProduct from "../utils/get_product";

export async function product(req: Request, res: Response, next: NextFunction) {
    try {
        const { id } = req.params;

        const data  = await getProduct(id)

        res.json(data);
    } catch (err) {
        generateError(err.message, err.statusCode, err.code)
    }
}
import express from "express";
import {createReview, product, products, reviews} from "../controllers/product";

const router = express.Router();

router.get('/', products);
router.get('/:id', product);
router.get('/:id/reviews', reviews);
router.post('/:id/reviews', createReview);

export default router
import express from "express";
import {createReview, product, reviews} from "../controllers/product";
const router = express.Router();

router.get('/:id', product);
router.get('/:id/reviews', reviews);
router.post('/:id/reviews', createReview);

export default router
import express from "express";
import { product } from "../controllers/product";
const router = express.Router();

router.get('/:id', product);
// router.get('/:id/reviews', getReview);
// router.post('/:id/reviews', newReview);

export default router
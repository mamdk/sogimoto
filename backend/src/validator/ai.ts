import {body, validationResult} from 'express-validator';

async function aiValidator(req) {
    await body('productId')
        .notEmpty().withMessage('Product ID is required')
        .trim()
        .run(req)

    await body('mood')
        .notEmpty().withMessage('Mood is required')
        .isString()
        .isIn(['product', 'reviews']).withMessage('Just product or reviews')
        .trim()
        .run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.mapped()
    }

    return null
}

export default aiValidator
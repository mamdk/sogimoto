import {body, param, validationResult} from 'express-validator';

async function reviewValidator(req) {
    await body('comment')
        .isString().withMessage('Comment must be a string')
        .trim()
        .isLength({ min: 3 }).withMessage('Comment must be at least 3 characters')
        .run(req)

    await body('rating')
        .notEmpty().withMessage('Rating is required')
        .isFloat({ min: 1, max: 5 }).withMessage('Rate must be an float between 1 and 5')
        .run(req)

    await param('id')
        .notEmpty().withMessage('Product ID is required')
        .trim()
        .run(req)

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return errors.mapped()
    }

    return null
}

export default reviewValidator
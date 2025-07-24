function errorHandler(err, req, res, next) {
    const statusCode = err.statusCode || 500;
    const response = {
        statusCode,
        error: {
            message: err.message || 'Internal Server Error',
            code: err.code || 'INTERNAL_ERROR',
            ...(process.env.APP_ENV === 'development' && { stack: err.stack })
        }
    };

    if (process.env.APP_ENV === 'development') {
        console.error(err, response);
    }

    return res.status(statusCode).json(response);
}

export default errorHandler
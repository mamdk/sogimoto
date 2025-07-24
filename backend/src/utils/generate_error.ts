function generateError(message: string, statusCode: number = 500, errorCode: string = 'INTERNAL_SERVER_ERROR') {
    const error: any = new Error(message);
    error.statusCode = statusCode;
    error.code = errorCode;
    throw error;
}

export default generateError
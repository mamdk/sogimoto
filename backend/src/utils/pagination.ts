import generateError from "src/utils/generate_error";

interface Pagination {
    offset: number;
    limitNumber: number;
    pageNumber: number;
}

function pagination(page: string = '1', limit: string = '10'): Pagination {
    const pageNumber = parseInt(page as string, 10);
    const limitNumber = parseInt(limit as string, 10);
    const offset = (pageNumber - 1) * limitNumber;

    if(isNaN(pageNumber) || isNaN(limitNumber)) {
        generateError('Bad Request', 400, 'BAD_REQUEST')
    }

    return {
        offset,
        limitNumber,
        pageNumber
    }
}

export default pagination
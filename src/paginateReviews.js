//pagination
export default async function paginateReviews(reviewsData, requestedPage, requestedLimit) {
    const pageRequested = parseInt(requestedPage);
    const limit = parseInt(requestedLimit);
    const dataLength = reviewsData.length;

    //prepare pagination data
    const page = pageRequested || 1;
    const startIndex = (page - 1) * limit;
    const endIndex = (startIndex + limit);
    const pageCount = Math.ceil(dataLength / limit);
    const total = dataLength;

    //pagionation data
    const pagination = {
        page,
        limit,
        pageCount,
        startIndex,
        endIndex,
        total
    };

    //prepare response array
    const reviews = reviewsData.slice(startIndex, endIndex);

    //to keep control over the response meta data
    const reviewArray = [{ data: reviews }, { meta: pagination }];
    return reviewArray;
};

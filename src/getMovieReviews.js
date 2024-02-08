import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";
const Q_MOVIE = "filters[movie]=";
const Q_PSIZE = "pagination[pageSize]=";

//fetch all reviews for a movie when there are more reviews than in the first fetch
async function xloadMovieReviews(id, number) {
    const response = await fetch(API_BASE + "/reviews" + "?" + Q_MOVIE + id + "&" + Q_PSIZE + number);
    const payload = await response.json();
    return payload;
}

//test if there are more reviews to get & call for the fetch 
async function evaluateIndex(id, index, number, payload) {
    if (index > 1) {
        const reviews = await xloadMovieReviews(id, number);
        return reviews;
    } else {
        return payload;
    }
}

//secure right amount of reviews
async function allReviews(id, payload) {
    if (payload.meta) {
        let xPageSize = payload.meta.pagination.pageSize;
        let xTotalReviews = payload.meta.pagination.total;
        let loadIndex = xTotalReviews / xPageSize;
        const reviews = await evaluateIndex(id, loadIndex, xTotalReviews, payload);
        return reviews;
    } else {
        return payload;
    }
}

//reviews for a movie
export default async function getMovieReviews(id, cmsAdapterReviews) {
    const payload = await cmsAdapterReviews.loadMovieReviews(id);
    const reviews = await allReviews(id, payload);

    //prepare reviews for right content & format
    const preparedReviews = reviews.data.map((obj) => {
        if (obj.attributes.author === null) {
            obj.attributes.author = "Anonymous";
        }
        return {
            id: obj.id,
            ...obj.attributes,
        }
    });
    const reviewsData = preparedReviews
        .filter(review => review.verified !== false);

    return reviewsData;
};

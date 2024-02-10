const cmsAdapterReviews = {
    async loadMovieReviews(id) {
        const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";
        const Q_MOVIE = "filters[movie]=";
        const response = await fetch(API_BASE + "/reviews" + "?" + Q_MOVIE + id);
        const payload = await response.json();
        return payload;
    }
}
export default cmsAdapterReviews;

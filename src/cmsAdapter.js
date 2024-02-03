const cmsAdapter = {
    async loadMovieReviews(id) {
        const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";
        const response = await fetch(API_BASE + "/reviews?filters[movie]=" + id);
        const payload = await response.json();
        return payload;
    }
}
export default cmsAdapter;

import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

const cmsAdapterRating = {
  async test10(id) {
    try {
      const response = await fetch(
        API_BASE + "/reviews?populate=movie&filters[movie]=" + id
      );
      const payload = await response.json();
      return (newArray = payload.data.map((object) => {
        return {
          rating: object.attributes.rating,
          imdbId: object.attributes.movie.data.attributes.imdbId,
        };
      }));
      //   return newArray;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cmsAdapterRating;

// import fetch from "node-fetch";

const cmsAdapterTEST1 = {
  async loadAllRatings() {
    const response = await fetch(
      API_BASE + "/reviews?populate=movie&filters[movie]=" + id
    );
    const payload = await response.json();
    return payload;
    /*     const newArray = payload.data.map((object) => {
      return {
        rating: object.attributes.rating,
        imdbId: object.attributes.movie.data.attributes.imdbId,
      };
    }); */
  },
};

export default cmsAdapterTEST1;

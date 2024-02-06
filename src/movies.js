import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

/*//fetch all reviews for a movie when there are more reviews than in the first fetch:
async function xloadMovieReviews(id, number) {
  console.log(id);
  console.log(number);
  //const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";
  const response = await fetch(API_BASE + "/reviews?filters[movie]=" + id + "&pagination[pageSize]=" + number);
  const payload = await response.json();
  console.log(payload);
  return payload;
}

//test if there are more reviews to get & call for the fetch: 
async function evaluateIndex(id, index, number, payload) {
  if (index > 1) {
    console.log(number);
    const reviews = await xloadMovieReviews(id, number);
    return reviews;
  } else {
    return payload;
  }
}

//secure right amount of reviews:
async function prepareReviews(id, payload) {
  if (payload.meta) {
    let xPageSize = payload.meta.pagination.pageSize;
    let xTotalReviews = payload.meta.pagination.total;
    let loadIndex = xTotalReviews / xPageSize;
    console.log(loadIndex);
    const reviews = await evaluateIndex(id, loadIndex, xTotalReviews, payload);
    console.log(reviews);
    return reviews;
  } else {
    return payload;
  }
}*/

export async function getMovies() {
  const response = await fetch(API_BASE + "/movies");
  const payload = await response.json();
  const modifiedArray = payload.data.map((obj) => {
    return {
      id: obj.id,
      ...obj.attributes,
    };
  });
  return modifiedArray;
}

export async function getMovie(id) {
  const response = await fetch(API_BASE + "/movies/" + id);
  const payload = await response.json();
  return {
    id: payload.data.id,
    ...payload.data.attributes,
  };
}


/*//reviews for a movie
export default async function getMovieReviews(id, cmsAdapter) {
  const payload = await cmsAdapter.loadMovieReviews(id);
  console.log(payload);

  //OBS: 
  //gick ej att byta ut till 
  //const preparedReviews = await prepareReviews(payload)
  //.filter(review => review.verified !== false);
  const reviews = await prepareReviews(id, payload);
  console.log(reviews);

  //prepare reviews for right content & format
  const preparedReviews = reviews.data.map((obj) => {
      if (obj.attributes.author === null) {
        obj.attributes.author = "Anonymous"
      } 
      console.log(obj.attributes.author);
      return {
        id: obj.id,
        ...obj.attributes,
      }
    });
  const reviewsData = preparedReviews
  .filter(review => review.verified !== false);

  return reviewsData;
};*/
 

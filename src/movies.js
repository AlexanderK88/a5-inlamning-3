import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

//fetch all reviews for a movie when there are more reviews than in the first fetch:
async function xloadMovieReviews(number) {
  //const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";
  const response = await fetch(API_BASE + "/reviews?pagination[pageSize]=" + number);
  const payload = await response.json();
  return payload;
}

//to test if there are more reviews to get & call for the fetch: 
async function evaluateIndex(index, number, payload) {
  if (index > 1) {
    return reviews = await xloadMovieReviews(number);
  } else {
    return payload;
  }
}

//secure right amount of reviews & prepare review object:
async function prepareReviews(payload) {
  if (payload.meta) {
    let xPageSize = payload.meta.pagination.pageSize;
    let xTotalReviews = payload.meta.pagination.total;
    let loadIndex = xTotalReviews / xPageSize;
    console.log(loadIndex);
    const reviews = await evaluateIndex(loadIndex, xTotalReviews, payload);
    console.log(reviews);
    return reviews.data.map((obj) => {
      return {
        id: obj.id,
        ...obj.attributes,
      }
    });
  } else {
    console.log(payload);
    const reviews = payload.data.map((obj) => {
      return {
        id: obj.id,
        ...obj.attributes,
      }
    });
    return reviews;
  }
}

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

//reviews for a movie
export default async function getMovieReviews(id, cmsAdapter) {
  const payload = await cmsAdapter.loadMovieReviews(id);

  console.log(payload);
  //console.log(payload.meta.pagination);

  const reviews = await prepareReviews(payload);
  console.log(reviews);

  return reviews
    .filter(review => review.rating >= 3);
}

/*//change to forEach instead!
       const verifiedArray = modifiedArray.map((obj) => {
           if (obj.verified !== false) {
               console.log(obj.verified);
               return obj;
           }            
       });

       console.log (verifiedArray);

       return verifiedArray;*/


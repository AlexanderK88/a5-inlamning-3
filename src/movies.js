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
    number = Math.ceil(number);
    //console.log(number);
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

  //OBS: 
  //gick ej att byta ut till 
  //const preparedReviews = await prepareReviews(payload);
  //.filter(review => review.verified !== false);
  const reviews = await prepareReviews(payload)
  const preparedReviews = reviews
    .filter(review => review.verified !== false);
  console.log(preparedReviews);

  return preparedReviews;
};
 
//for pagination
/*export async function paginate(pageRequested, pageSize, dataLength) {
  const page = pageRequested || 1;
  const startIndex = (page - 1) * pageSize;
  console.log(startIndex);
  const endIndex = startIndex + pageSize;
  const pageCount = Math.ceil(dataLength / pageSize);
  console.log(pageCount);
  
  //pagionation data
  const pagination = { 
    page,
    limit: pageSize,
    pageCount,
    startIndex,
    endIndex
  };
  return pagination;
}*/

  //for pagination:
  //return paginatedResult = paginate(preparedReviews);

  /*const page = parseInt(request.query.page);
  const limit = parseInt(request.query.limit);
  const startIndex = (page-1) * limit;
  const endIndex = page * limit;

  const sentResult = {};
  if (endIndex < preparedReviews.length) {
    sentResult.next = {
      page: page + 1,
      limit: limit,
    };
  }
  if (startIndex > 0) {
    sentResult.pevious = {
      page: page -1,
      limit: limit,
    };
  }

  sentResult.results = preparedReviews.slice(startIndex, endIndex);
  return sentResult;*/

  //return reviews
  //.filter(review => review.rating >= 3)
  //.filter(review => review.verified !== false)
  //.slice(startIndex, endIndex);

/*function paginate(resource) {
  return (request, response, next) => {
    const page = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;

    //add next &/or previous when necessary:
    const preparedResult = {};
    if (endIndex < resource.length) {
      preparedResult.next = {
        page: page + 1,
        limit: limit,
      };
    }
    if (startIndex > 0) {
      preparedResult.pevious = {
        page: page - 1,
        limit: limit,
      };
    }

    preparedResult.results = resource.slice(startIndex, endIndex);
    console.log(preparedResult.results);
    //response.paginatedResult = preparedResult;
    response = preparedResult;
    next();
    //return sentResult;
  }
}*/
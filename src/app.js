import express from "express";
import { engine } from "express-handlebars";
import { getMovie, getMovies } from "./movies.js";
import { marked } from "marked";
import getMovieReviews from "./movies.js";
import cmsAdapter from "./cmsAdapter.js";
//import paginate from "./movies.js";
//import Test from "supertest/lib/test.js";

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

const menu = [
  { name: "Movies", url: "/movies" },
  { name: "About us", url: "/aboutus" },
  { name: "News & events", url: "/newsevents" },
];

async function renderPage(response, page, extraData = {}) {
  response.render(page, {
    menuLink: menu.map((link) => {
      return {
        label: link.name,
        link: link.url,
      };
    }),
    ...extraData,
  });
}

app.get("/", async (request, response) => {
  renderPage(response, "index");
});

app.get("/movies", async (request, response) => {
  const movies = await getMovies();
  renderPage(response, "movies", { movies });
});

app.get("/movies/:movieId", async (request, response) => {
  const movie = await getMovie(request.params.movieId);
  movie.intro = marked(movie.intro);
  renderPage(response, "movie", { movie });
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});
//////////////////////////////////////////////////////////////////////////////////
//get reviews for a movie
/*app.get("/api/reviews/:movieId", async (request, response) => {
  const reviews = await getMovieReviews((request.params.movieId), cmsAdapter);

  console.log(reviews); 
  
  if (reviews) {
    response.status(200).json(reviews);
  } else {
    response.sendStatus(404).json({
      error: "No reviews",
    });
  }
});*/


///////////////////////////////////////////////////////////////////////////////

//get all reviews for a movie
/*onst middleware1 = (async (request, response, next) => {
  const reviewsData = await getMovieReviews((request.params.movieId), cmsAdapter);
  next()
})

//pagination for a movie's reviews
const middleware2 = (request, response, next) => {
  const paginateData = paginate(request.query.page, request.query.limit, 5);

  //extract start- & endIndex from paginateData
  const { startIndex, endIndex } = paginateData.pagination;
  //extract requested amount of reviews from reviewsData
  const reviews = reviewsData.slice(startIndex, endIndex);

  console.log(reviews);

  if (reviews) {
    response.status(200).json(reviews);
  } else {
    response.sendStatus(404).json({
      error: "No reviews",
    });
  }
}

//get reviews for a movie
app.get("/api/reviews/:movieId", middleware1, middleware2); */

//////////////////////////////////////////////////////////////////////////////////////////////

//get reviews for a movie
app.get("/api/reviews/:movieId", async (request, response, /*next*/) => {
  try {
    const reviewsData = await getMovieReviews((request.params.movieId), cmsAdapter);

    console.log(reviewsData.length);
    console.log(request.query.page);
    console.log(request.query.limit);

    const pageRequested = parseInt(request.query.page);
    const pageSize = parseInt(request.query.limit);
    const dataLength = reviewsData.length;

    //prepare pagination data
    const page = pageRequested || 1;
    const startIndex = (page - 1) * pageSize;
    console.log(startIndex);
    const endIndex = (startIndex + pageSize);
    const pageCount = Math.ceil(dataLength / pageSize);
    const total = dataLength;
    console.log(pageCount);

    //pagionation data
    const pagination = {
      page,
      limit: pageSize,
      pageCount,
      startIndex,
      endIndex,
      total
    };

    const reviews = reviewsData.slice(startIndex, endIndex)
    reviews.push(pagination);
    console.log(reviews);

    if (reviews.length > 1) {
      response.status(200).json(reviews);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    response.sendStatus(404);/*.json({
      error: "No reviews",
    });*/
  }
});

//const dataLength = reviewsData.length;
/* } catch (err) {
   next (err);
 } 
 {*/

/*const paginateData = await paginate(request.query.page, request.query.limit, reviewsData.length);

console.log(paginateData); 

//extract start- & endIndex from paginateData
const { startIndex, endIndex } = paginateData.pagination;

//extract requested amount of reviews from reviewsData
const reviews = reviewsData.slice(startIndex, endIndex);

console.log(reviews);

if (reviews) {
  response.status(200).json(reviews);
} else {
  response.sendStatus(404).json({
    error: "No reviews",
  });
}
//}
});*/
///////////////////////////////////////////////////////////////////////////////////////////
//get all reviews for a movie
/*app.get("/api/reviews/:movieId", async (request, response, next) => {
  const reviewsData = await getMovieReviews((request.params.movieId), cmsAdapter);
  request.middlewares = [reviewsData];
  next()
}, 
function (request, response, next) {

  const paginateData = paginate(request.query.page, request.query.limit, reviewsData.length);

  //extract start- & endIndex from paginateData
  const { startIndex, endIndex } = paginateData.pagination;
  //extract requested amount of reviews from reviewsData
  const reviews = reviewsData.slice(startIndex, endIndex);

  console.log(reviews);

  request.middlewares.push()

  if (reviews) {
    response.status(200).json(reviews);
  } else {
    response.sendStatus(404).json({
      error: "No reviews",
    });
  }
})*/

///////////////////////////////////////////////////////////////////////////////

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;

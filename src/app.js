import express from "express";
import { engine } from "express-handlebars";
import { getMovie, getMovies } from "./movies.js";
import { marked } from "marked";
import getMovieReviews from "./getMovieReviews.js";
import cmsAdapterReviews from "./cmsAdapterReviews.js";
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

//get reviews for a movie
app.get("/api/movies/:movieId", async (request, response, /*next*/) => {
  try {
    const reviewsData = await getMovieReviews((request.params.movieId), cmsAdapterReviews);

    const pageRequested = parseInt(request.query.page);
    const limit = parseInt(request.query.limit);
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
    const reviews = reviewsData.slice(startIndex, endIndex)
    const reviewArray = [{data: reviews}, {meta: pagination}];

    if (reviewArray.length > 1) {
      response.status(200).json(reviewArray);
    } else {
      response.sendStatus(404);
    }
  } catch (error) {
    response.sendStatus(404);/*.json({
      error: "No reviews",
    });*/
  }
});

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;

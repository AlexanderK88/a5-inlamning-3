import express from "express";
import { engine } from "express-handlebars";
import { getMovie, getMovies } from "./movies.js";
import { marked } from "marked";
import getMovieReviews from "./movies.js";
import cmsAdapter from "./cmsAdapter.js";
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
app.get("/api/reviews/:movieId", async (request, response) => {
  const reviews = await getMovieReviews((request.params.movieId), cmsAdapter);

  console.log(reviews); 
  
  if (reviews) {
    response.status(200).json(reviews);
  } else {
    response.sendStatus(404).json({
      error: "No reviews",
    });
  }
});

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;
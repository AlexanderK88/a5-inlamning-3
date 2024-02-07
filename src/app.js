import express from "express";
import { engine } from "express-handlebars";
import cmsAdapterRecentScreenings from "./cmsAdapterRecentScreenings.js";
import getRecentScreenings from "./getRecentScreenings.js";
import { getMovie, getMovies, getMovieScreenings } from "./movies.js";
import { marked } from "marked";
import cmsAdapter from "./cmsAdapterScreenings.js";

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

app.get("/api/recent-screenings", async (request, response) => {
  const data = await getRecentScreenings(cmsAdapterRecentScreenings);
  response.json(data);
});

app.get("/movies", async (request, response) => {
  const movies = await getMovies();
  renderPage(response, "movies", { movies });
});

app.get("/movies/:movieId", async (request, response) => {
  try {
    const movie = await getMovie(request.params.movieId);
    movie.intro = marked(movie.intro);
    renderPage(response, "movie", { movie });
  } catch(error) {
    renderPage(response, '404')
  }
});

app.get("/api/movies/:id/screenings", async (request, response) => {
  try{
    const movieScreenings = await getMovieScreenings(cmsAdapter, request.params.id);
    response.json(movieScreenings);
  }catch(error) {
    console.log(error.message)
  }
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;

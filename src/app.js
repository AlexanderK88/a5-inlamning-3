import express from "express";
import { engine } from "express-handlebars";
import cmsAdapterRecentScreenings from "./cmsAdapterRecentScreenings.js";
import getRecentScreenings from "./getRecentScreenings.js";
import { getMovie, getMovies, getMovieScreenings } from "./movies.js";
import { marked } from "marked";
import { builder } from "./buildReviewBody.js";
import { parser as reviewParser } from "./postReviewParser.js";
import { postRequest } from "./reviewPostFunction.js";
import cmsAdapter from "./cmsAdapterScreenings.js";
import jsonwebtoken from "jsonwebtoken";

const USERNAME = "admin";
const PASSWORD = "pass";
const JWT_SECRET = "hundenhemmahetermolleocharsjuaergammal";

const app = express();
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./templates");

//used for POST request.
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

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

app.get("/api/movies/recent-screenings", async (request, response) => {
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
  } catch (error) {
    renderPage(response, "404");
  }
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});

app.get("/api/movies/:id/screenings", async (request, response) => {
  try {
    const movieScreenings = await getMovieScreenings(cmsAdapter, request.params.id);
    response.json(movieScreenings);
  } catch (error) {
    console.log(error.message);
  }
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});

app.post("/api/movies/review", (request, response) => {
  const authHeader = request.headers.authorization;
  // console.log(authHeader);
  const token = authHeader?.slice(7);
  // console.log('token', token);
  let verified = "false";
  try {
    if (jsonwebtoken.verify(token, JWT_SECRET)) {
      verified = "true";
      console.log("Verified", verified);
    } else {
      verified = "false";
    }
  } catch (err) {
    console.log("no jwt");
  }
  //Extracts URL-Query string to object
  const reviewAtributes = reviewParser(request, verified);
  console.log(reviewAtributes);
  // Convert the JavaScript object to a JSON string
  const jsonData = JSON.stringify(builder(reviewAtributes)) + "\n";

  //Print out the json-string to make sure its correct.
  console.log("review attr: ", jsonData);

  //Url to DB for post-function
  const url = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";

  //request the post command with url and json-string.
  // postRequest(url, jsonData, response);
});

app.post("/api/login", (request, response) => {
  const authHeader = request.headers.authorization;
  const b64credentials = authHeader?.slice(6);
  let username, password;

  try {
    const credentials = atob(b64credentials);
    [username, password] = credentials.split(":");
  } catch (err) {
    username = "";
    password = "";
  }

  if (username == USERNAME && password == PASSWORD) {
    const jwt = jsonwebtoken.sign(
      {
        username: username,
        role: "superuser",
      },
      JWT_SECRET,
    );
    response.status(200).json({
      ok: true,
      token: jwt,
    });
    console.log("ok");
  } else {
    response.status(401).json({
      ok: false,
    });
    console.log("Not ok");
  }
});

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;

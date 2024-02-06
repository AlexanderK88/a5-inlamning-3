import express from "express";
import { engine } from "express-handlebars";
import { getMovie, getMovies, getMovieScreenings } from "./movies.js";
import { marked } from "marked";
import { builder } from "../buildReviewBody.js";
import fs from "fs";

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

app.get("/movies", async (request, response) => {
  const movies = await getMovies();
  renderPage(response, "movies", { movies });
});

app.get("/movies/:movieId", async (request, response) => {
  const movie = await getMovie(request.params.movieId);
  movie.intro = marked(movie.intro);
  renderPage(response, "movie", { movie });
});

app.get("/api/movies/:id/screenings", async (req, res) => {
  const movieScreenings = await getMovieScreenings(req.params.id);
  res.json(movieScreenings);
});

app.get("/aboutus", async (request, response) => {
  renderPage(response, "aboutus");
});

app.get("/newsevents", async (request, response) => {
  renderPage(response, "newsevents");
});

app.post("/movies/review", (request, response) => {
  const id = request.body.id;
  const comment = request.body.comment;
  const rating = request.body.rating;
  const author = request.body.author;
  console.log("request: ", request);
  const reviewAttributes = {
    movie: id,
    comment: comment,
    rating: rating,
    author: author,
    createdAt: "2024-02-05T16:45:17.078Z",
    updatedAt: "2024-02-05T16:45:17.078Z",
    createdBy: author,
    updatedBy: author,
  };
  // Convert the JavaScript object to a JSON string
  const jsonData = JSON.stringify(builder(reviewAttributes)) + "\n";

  console.log("review attr: ", jsonData);

  const fetchUrl = "https://plankton-app-xhkom.ondigitalocean.app/api/reviews";
  fetch(fetchUrl, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: jsonData,
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Failed to write data to database");
      }
      return response.json();
    })
    .then((data) => {
      console.log("Data written to database:", data);
      response.status(201).send("Data written to database");
    })
    .catch((error) => {
      console.error("Error writing to database:", error.message);
      response.status(500).send("Error writing to database");
    });
});

// //Test POST to local review.json
// app.post("/movies/:movieId/test", (request, response) => {
//   const id = request.body.id;
//   const comment = request.body.comment;
//   const rating = request.body.rating;
//   const author = request.body.author;

//   const reviewAttributes = {
//     movie: id,
//     comment: comment,
//     rating: rating,
//     author: author,
//     createdBy: author,
//     updatedBy: "nil",
//     verified: false,
//   };

//   // Convert the JavaScript object to a JSON string
//   const jsonData = JSON.stringify(builder(reviewAttributes)) + "\n";

//   console.log("builder:", jsonData); // Pass request.body to builder
//   console.log("======");

//   // Write the JSON data to the file
//   if (comment.length > 3 && author.length > 3 && rating >= 1 && rating <= 5) {
//     fs.appendFile("./static/review.json", jsonData, (err) => {
//       if (err) {
//         console.error("Error writing to file:", err);
//         response.status(500);
//       } else {
//         console.log("Data written to file");
//         response.status(201);
//         // expect(response.text).toBe("Data written to file");
//       }
//     });
//   } else {
//     console.log("To little info");
//     response
//       .status(400)
//       .send("Bad Request: Insufficient information provided in comment and author fields");
//   }
// });

app.use("/static", express.static("./static"));
app.use("/public", express.static("./public"));

export default app;

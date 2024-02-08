import fetchMovieScreenings from "./fetchMovieScreenings.js";
import renderMovieScreenings from "./renderMovieScreenings.js";

async function main() {
  const movieScreenings = await fetchMovieScreenings();
  renderMovieScreenings(movieScreenings);
}

main();

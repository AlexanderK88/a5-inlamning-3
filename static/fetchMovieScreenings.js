export default async function fetchMovieScreenings() {
  const currentPath = window.location.pathname;
  const base = window.location.origin;
  const url = new URL("/api" + currentPath + "/screenings", base);
  const response = await fetch(url);
  const movieScreenings = await response.json();
  return movieScreenings;
}

export default async function getOMDB(data) {
  const imdbMovieID = data.map(
    (imdb) => imdb.attributes.movie.data.attributes.imdbId
  )[0];
  const OMDB_rating = await fetch(
    "https://www.omdbapi.com/?apikey=bf65b015&i=" + imdbMovieID
  );
  const OMDB_payload = await OMDB_rating.json();
  return OMDB_payload.imdbRating;
}

const element = document.querySelector("#ratingValue");
const url_Link = window.location.href.slice(-1);
async function fetchavärde() {
  const data = await fetch(
    `http://localhost:5080/api/movies/rating/${url_Link}`
  )
    .then((x) => x.text())
    .then((y) => element.append(y));
}
fetchavärde();

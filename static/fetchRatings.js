const ratingElement = document.querySelector(".movieInformation__presentValue");

async function fetchRatings() {
  const url = window.location.origin + "/api" + window.location.pathname;
  const response = await fetch(url);
  const averageRating = await response.json.parse();
  ratingElement.append(averageRating);
  return ratingElement;
}
fetchRatings();

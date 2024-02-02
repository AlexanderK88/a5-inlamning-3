const currentPath = window.location.pathname;

async function fetchMovieScreenings() {
  const response = await fetch("/api" + currentPath + "/screenings");
  const movieScreenings = await response.json();
  return movieScreenings;
}

function renderMovieScreenings(movieScreenings) {
  const listElement = document.querySelector(".movieInformation__list");
  movieScreenings.forEach((screening) => {
    const listItem = document.createElement("li");

    const date = new Date(screening.start_time);

    const timeOptions = { hour: "2-digit", minute: "2-digit" };
    const dateOptions = { day: "numeric", month: "short", year: "numeric" };
    const time = new Intl.DateTimeFormat("default", timeOptions).format(date);
    const formattedDate = new Intl.DateTimeFormat("default", dateOptions).format(date);

    listItem.innerHTML = `Theater: ${screening.room}<br>Start time: ${time}, ${formattedDate}`;
    listElement.appendChild(listItem);
  });
}

async function main() {
  const movieScreenings = await fetchMovieScreenings();
  renderMovieScreenings(movieScreenings);
}

main();

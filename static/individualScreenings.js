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

    let theaterText = document.createElement("p");
    theaterText.textContent = `Theater: ${screening.room}`;
    theaterText.classList.add("movieInformation__theater");
    listItem.appendChild(theaterText);

    let timeText = document.createElement("p");
    timeText.textContent = `Start time: ${time}, ${formattedDate}`;
    timeText.classList.add("movieInformation__startTime");
    listItem.appendChild(timeText);

    listElement.appendChild(listItem);
  });
}

async function main() {
  const movieScreenings = await fetchMovieScreenings();
  renderMovieScreenings(movieScreenings);
}

main();

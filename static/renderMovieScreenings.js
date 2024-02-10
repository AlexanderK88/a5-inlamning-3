export default function renderMovieScreenings(movieScreenings) {
  const listElement = document.querySelector(".movieInformation__list");
  if (movieScreenings.length > 0) {
    movieScreenings.forEach((screening) => {
      const listItem = document.createElement("li");

      const date = new Date(screening.start_time);

      const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: "UTC" };
      const dateOptions = { day: "numeric", month: "short", year: "numeric", timeZone: "UTC" };
      const time = new Intl.DateTimeFormat("en-GB", timeOptions).format(date);
      const formattedDate = new Intl.DateTimeFormat("en-GB", dateOptions).format(date);

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
  } else {
    const listItem = document.createElement("li");
    let noScreeningText = document.createElement("p");
    noScreeningText.classList.add("movieInformation__noScreenings");
    noScreeningText.textContent = "Sorry, no screening found";
    listItem.appendChild(noScreeningText);

    listElement.appendChild(listItem);
  }
}

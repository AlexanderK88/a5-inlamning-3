async function fetchScreenings() {
  try {
    const response = await fetch("/api/movies/recent-screenings");

    if (!response.ok) {
      throw new error(`Status: ${response.status} Failed to fetch screenings!`);
    }

    const originalData = await response.json();
    const relevantData = originalData.map((screening) => ({
      start_time: convertToEuropeanTime(screening.attributes.start_time),
      start_date: convertToEuropeanDate(screening.attributes.start_time),
      room: screening.attributes.room,
      title: screening.attributes.movie.data.attributes.title,
    }));

    for (let i = 0; i < relevantData.length; i++) {
      const screeningData = appendScreenings(relevantData[i]);
      document.querySelector(".frontpage__screenings").appendChild(screeningData);
    }
  } catch (error) {
    console.error("Can't fetch screenings", error.message);
  }
}

fetchScreenings();

function appendScreenings(screeningData) {
  const screeningContainer = document.createElement("div");
  screeningContainer.classList.add("frontpage__container");

  const screeningTitle = document.createElement("h4");
  screeningTitle.textContent = screeningData.title;
  screeningTitle.classList.add("frontpage__title");
  screeningContainer.appendChild(screeningTitle);

  const screeningRoom = document.createElement("p");
  screeningRoom.textContent = `Salong: ${screeningData.room}`;
  screeningRoom.classList.add("frontpage__room");
  screeningContainer.appendChild(screeningRoom);

  const screeningTime = document.createElement("p");
  screeningTime.textContent = `Start tid: ${screeningData.start_time}, ${screeningData.start_date}`;
  screeningTime.classList.add("frontpage__time");
  screeningContainer.appendChild(screeningTime);

  return screeningContainer;
}

function convertToEuropeanTime(isoTime) {
  const date = new Date(isoTime);
  return date.toLocaleString("en-GB", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
    timeZone: "UTC",
  });
}

function convertToEuropeanDate(isoTime) {
  const date = new Date(isoTime);
  return date.toLocaleString("en-GB", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    timeZone: "UTC",
  });
}

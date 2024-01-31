const currentPath = window.location.pathname;

fetch("/api" + currentPath + "/screenings")
  .then((response) => response.json())
  .then((movieScreenings) => {
    movieScreenings.forEach((screening) => {
      console.log("Start time:", screening.start_time);
      console.log("Theater:", screening.room);
    });
  });

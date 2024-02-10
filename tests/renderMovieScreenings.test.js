/**
 * @jest-environment jsdom
 */

import renderMovieScreenings from "../static/renderMovieScreenings";

describe("renderMovieScreenings", () => {
  beforeEach(() => {
    document.body.innerHTML = "";
  });
  test("should format time and date correctly", () => {
    document.body.innerHTML = '<ul class="movieInformation__list"><ul>';
    const mockMovieData = [
      {
        createdAt: "2024-01-29T19:08:47.294Z",
        id: 222,
        room: "Stora salongen",
        start_time: "2026-02-06T19:00:00.000Z",
        updatedAt: "2024-01-29T19:08:47.294Z",
      },
    ];

    renderMovieScreenings(mockMovieData);
    const listItem = document.querySelector("li");

    expect(listItem.textContent).toContain("Theater: Stora salongenStart time: 19:00, 6 Feb 2026");
  });

  test("if no screening, P with text appears", () => {
    document.body.innerHTML = '<ul class="movieInformation__list"><ul>';
    const mockNoMovieData = [];
    renderMovieScreenings(mockNoMovieData);
    const listItem = document.querySelector("li");

    expect(listItem.textContent).toContain("Sorry, no screening found");
  });
});

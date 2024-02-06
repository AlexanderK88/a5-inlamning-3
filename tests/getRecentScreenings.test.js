import { jest } from "@jest/globals";
import request from "supertest";
import app from "../src/app";
import getRecentScreenings from "../src/getRecentScreenings.js";

describe("getRecentScreenings()", () => {
  beforeEach(() => {
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.clearAllTimers();
  });

  function mockScreenings(attributes) {
    return {
      id: Math.floor(Math.random() * 100),
      attributes: {
        start_time: "2024-02-01T19:18:00.000Z",
        room: "tempRoom",
        createdAt: "tempCreatedAt",
        updatedAt: "tempUpdatedAt",
        movie: {
          data: {
            id: Math.floor(Math.random() * 100),
            attributes: {
              title: "tempName",
              imdbId: "tempImdbId",
              intro: "tempDescription",
              image: {
                url: "tempImage",
              },
              createdAt: "tempMovieCreatedAt",
              updatedAt: "tempMovieUpdatedAt",
              publishedAt: "tempMoviePublishedAt",
            },
          },
        },
        ...attributes,
      },
    };
  }

  test("Check if there are 10 upcoming screenings in the next 5 days", async () => {
    jest.setSystemTime(new Date("2024-02-01T19:18:00.000Z"));

    const cmsAdapterRecentScreenings = {
      loadAllScreenings: async () => [
        mockScreenings({ start_time: "2024-02-01T19:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-01T23:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T03:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T07:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T11:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T15:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T19:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-02T23:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-03T03:18:00.000Z" }),
        mockScreenings({ start_time: "2024-02-03T07:18:00.000Z" }),
      ],
    };

    const data = await getRecentScreenings(cmsAdapterRecentScreenings);
    expect(data).toHaveLength(10);

    const fiveDaysFromNow = new Date("2024-02-06T19:18:00.000Z");
    const beforeFiveDays = data.every((screening) => {
      const startTime = new Date(screening.attributes.start_time);
      return startTime <= fiveDaysFromNow;
    });

    expect(beforeFiveDays).toBe(true);
  });
});

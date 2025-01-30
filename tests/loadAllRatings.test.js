import { describe, it, expect, jest } from "@jest/globals";
import loadAllRatings from "../src/cmsAdapterRatings.js";

// Mocka fetch-funktionen globalt
global.fetch = jest.fn(() =>
  Promise.resolve({
    json: () => Promise.resolve({ data: [{ id: 1, review: "Great movie!" }] }),
  })
);

describe("loadAllRatings", () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  it("should fetch and return data", async () => {
    const id = 123;
    const data = await loadAllRatings(id);

    expect(data).toEqual([{ id: 1, review: "Great movie!" }]);
    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://plankton-app-xhkom.ondigitalocean.app/api/reviews?populate=movie&filters[movie]=123"
    );
  });

  it("should handle fetch errors", async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error("Network error"))
    );

    try {
      await loadAllRatings(123);
    } catch (error) {
      expect(error).toEqual(new Error("Network error"));
    }

    expect(fetch).toHaveBeenCalledTimes(1);
    expect(fetch).toHaveBeenCalledWith(
      "https://plankton-app-xhkom.ondigitalocean.app/api/reviews?populate=movie&filters[movie]=123"
    );
  });
});

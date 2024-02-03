import { jest, expect, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("POST /movies/:movieId/review", () => {
  it('responds with 201 and "Data written to database" when valid data is sent', async () => {
    const mockData = {
      id: "1",
      comment: "Jest Auto Test",
      rating: 5,
      author: "MatsTestar",
    };

    fetch.mockResolvedValue({
      json: jest.fn().mockResolvedValue(mockData),
    });

    // Send a POST request to the endpoint with reviewData
    const response = await request(app).post("/movies/1/review").send(mockData);

    expect(response.status).toBe(201);
    expect(response.body).toEqual(mockData);
  });

  it("responds with 500 when invalid data is sent", async () => {
    // Send a POST request to the endpoint with invalid data
    const response = await request(app).post("/movies/1/review").send({}); // Sending empty data intentionally to trigger validation failure

    // Assert the response status
    expect(response.status).toBe(500);
  });
});

import { expect, test } from "@jest/globals";
import request from "supertest";
import app from "../src/app";

describe("POST /movies/:movieId/review", () => {
  it('responds with 201 and "Data written to database" when valid data is sent', async () => {
    const reviewData = {
      id: "1",
      comment: "Test comment",
      rating: 5,
      author: "Test author",
    };

    // Send a POST request to the endpoint with reviewData
    const response = await request(app)
      .post("/movies/1/review") // You need to replace 'movie_id_here' with the actual movie ID
      .send(reviewData);

    // Assert the response status and body
    expect(response.status).toBe(201);
    expect(response.text).toBe("Data written to database");
  });

  it("responds with 500 when invalid data is sent", async () => {
    // Send a POST request to the endpoint with invalid data
    const response = await request(app)
      .post("/movies/1/review") // You need to replace 'movie_id_here' with the actual movie ID
      .send({}); // Sending empty data intentionally to trigger validation failure

    // Assert the response status
    expect(response.status).toBe(500);
  });
});

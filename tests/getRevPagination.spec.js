import { expect, test } from '@jest/globals';
import request from 'supertest';
import app from '../src/app';
import getMovieReviews from "../src/getMovieReviews";

//OBS: Does not test when total > pageSize

describe("GET /api/reviews/:movieId", () => {
    test('should return max 5 revies and 1 pagination data-object', async () => {
        const cmsAdapterReviews = {
            loadMovieReviews: async () => ({
                data: [
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true })
                ],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 25,
                        pageCount: 1,
                        total: 3
                    },
                },
            })
        };

        await getMovieReviews(3, cmsAdapterReviews)
        request(app).get("/api/reviews/:movieId")
            .query({ page: 1 })
            .query({ limit: 5 })
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeLessThanOrEqual(6);
                expect(res.body.length).toBeGreaterThanOrEqual(1);
            })
    });

    test('should return max 5 revies and 1 pagination data-object', async () => {
        const cmsAdapterReviews = {
            loadMovieReviews: async () => ({
                data: [
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: false }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: false })
                ],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 24,
                        pageCount: 1,
                        total: 24
                    },
                },
            })
        };

        await getMovieReviews(3, cmsAdapterReviews)
        request(app).get("/api/reviews/:movieId")
            .query({ page: 2 })
            .query({ limit: 5 })
            .expect(200)
            .then((res) => {
                expect(res.body.length).toBeLessThanOrEqual(6);
                expect(res.body.length).toBeGreaterThanOrEqual(1);
            })
    });
});

function mockReviews(attributes) {
    return {
        id: 49,
        attributes: {
            comment: "Very nice movie",
            rating: 4,
            author: null,
            verified: false,
            createdAt: "2023-02-05T00:48:48.320Z",
            updatedAt: "2023-02-05T00:48:48.320Z",
            ...attributes,
        },
    }
}

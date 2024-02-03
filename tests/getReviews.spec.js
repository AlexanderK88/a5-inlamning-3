import getMovieReviews from "../src/movies";

describe("getMovieReviews()", () => {
    /*test("includes a review with a 3-5 rating", async () => {
        const cmsAdapter = {
            loadMovieReviews: async () => ({
                data: [
                    mockReviews({ rating: 3 }),
                    mockReviews({ rating: 4 }),
                    mockReviews({ rating: 5 })
                ],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 25,
                        pageCount: 1,
                        total: 19
                    },
                },
            })
        };

        const data = await getMovieReviews(3, cmsAdapter);

        expect(data).toHaveLength(3);
    });*/

    test("excludes a review with verified == false", async () => {
        const cmsAdapter = {
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
                        total: 19
                    },
                },
            })
        };

        const data = await getMovieReviews(3, cmsAdapter);

        expect(data).toHaveLength(2);
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
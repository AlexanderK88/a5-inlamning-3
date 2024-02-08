import getMovieReviews from "../src/getMovieReviews";

describe("getMovieReviews()", () => {    
    test("excludes a review with verified == false", async () => {
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

        const data = await getMovieReviews(3, cmsAdapterReviews);

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

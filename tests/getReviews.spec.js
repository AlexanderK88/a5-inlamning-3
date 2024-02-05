import getMovieReviews from "../src/movies";
//import paginate from "../src/movies";

describe("getMovieReviews()", () => {    
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
                        total: 3
                    },
                },
            })
        };

        const data = await getMovieReviews(3, cmsAdapter);

        expect(data).toHaveLength(2);
    });
});

describe ("GET /api/reviews/:movieId", () => {
    test('should return 5 revies and 1 pagination data-object', async () => {
        const res = await request(app).get("/api/reviews/2?page=1&limit=5")
        .expect(200);

        expect(res).toHaveLength(6);
    });
});

/*describe ("GET /api/reviews/:movieId", () => {
    test('should return 5 revies and 1 pagination data-object', async () => {
        const res = await request(app).get("/api/reviews/${movieId}")
        .expect(200)
        .expect('content-Type', /json/)

        expect(res).toHaveLength(6);
    });
});*/


/*describe ("GET /api/reviews/:movieId", () => {
    test('should return 5 revies and 1 pagination data-object', async () => {
        const res = await request(app).get("/api/reviews/${movieId}", async () => {
            const cmsAdapter = {
                loadMovieReviews: async () => ({
                    data: [
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: true }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                        mockReviews({ verified: null }),
                    ],
                    meta: {
                        pagination: {
                            page: 1,
                            pageSize: 25,
                            pageCount: 1,
                            total: 20
                        },
                    },
                })
            };
            const data = await getMovieReviews(3, cmsAdapter);

        })
            .expect('content-Type', /json/)
            .expect(200);

            expect (res).toHaveLength(6);
    });
});*/

/*describe("paginate()", () => {
    test("includes only 5 reviews in each respone", async () => {
        const cmsAdapter = {
            loadMovieReviews: async () => ({
                data: [
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: true }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                    mockReviews({ verified: null }),
                ],
                meta: {
                    pagination: {
                        page: 1,
                        pageSize: 25,
                        pageCount: 1,
                        total: 20
                    },
                },
            })
        };

        const data = await getMovieReviews(3, cmsAdapter);
        const reviews = await paginate (2, 5, data.length);

        expect(reviews).toHaveLength(6);
        //expect(reviews[0]).toHaveLength(5);
    });*/
//});


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
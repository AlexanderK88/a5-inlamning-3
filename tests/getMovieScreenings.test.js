import { getMovieScreenings } from "../src/movies";

describe('getMovieScreenings', () => {

    test('No old screenings should appear', async () => {

        const screenings = await getMovieScreenings({
            loadAllMovieScreenings: async () => ({
                    "data": [
                        {
                          "id": 203,
                          "attributes": {
                            "start_time": "2023-06-15T21:00:00.000Z",
                            "room": "Stora salongen",
                            "createdAt": "2023-05-25T13:09:54.278Z",
                            "updatedAt": "2023-05-25T13:09:54.278Z"
                          }
                        },
                        {
                          "id": 204,
                          "attributes": {
                            "start_time": "2024-03-30T12:00:00.000Z",
                            "room": "Stora salongen",
                            "createdAt": "2024-01-29T19:08:41.554Z",
                            "updatedAt": "2024-01-29T19:08:41.554Z"
                          }
                        },
                    ]               
                })
        }, 3)
        expect(screenings.length).toEqual(1)
    })

    test('Dates should be in order', async () => {
        const screenings = await getMovieScreenings({
            loadAllMovieScreenings: async () => ({
                    "data": [
                        {
                          "id": 203,
                          "attributes": {
                            "start_time": "2025-06-15T21:00:00.000Z",
                            "room": "Stora salongen",
                            "createdAt": "2023-05-25T13:09:54.278Z",
                            "updatedAt": "2023-05-25T13:09:54.278Z"
                          }
                        },
                        {
                          "id": 204,
                          "attributes": {
                            "start_time": "2024-03-30T12:00:00.000Z",
                            "room": "Stora salongen",
                            "createdAt": "2024-01-29T19:08:41.554Z",
                            "updatedAt": "2024-01-29T19:08:41.554Z"
                          }
                        },
                        {
                            "id": 204,
                            "attributes": {
                              "start_time": "2024-03-20T12:00:00.000Z",
                              "room": "Stora salongen",
                              "createdAt": "2024-01-29T19:08:41.554Z",
                              "updatedAt": "2024-01-29T19:08:41.554Z"
                            }
                          },
                    ]               
                })
        }, 3)
        expect(screenings[0].start_time).toContain("2024-03-20T12:00:00.000Z")
        expect(screenings[2].start_time).toContain("2025-06-15T21:00:00.000Z")
    })

    test('To handle empty data', async () => {
        const screenings = await getMovieScreenings({
            loadAllMovieScreenings: async () => ({
                    "data": []               
                })
        }, 3)
        expect(screenings).toEqual([])
    })

    test('should correctly transform data', async () => {
        const screenings = await getMovieScreenings({
            loadAllMovieScreenings: async () => ({
                    "data": [
                        {
                          "id": 203,
                          "attributes": {
                            "start_time": "2025-06-15T21:00:00.000Z",
                            "room": "Stora salongen",
                            "createdAt": "2023-05-25T13:09:54.278Z",
                            "updatedAt": "2023-05-25T13:09:54.278Z"
                          }
                        }
                    ]               
                })
        }, 3)
        expect(screenings).toEqual([{
            id: 203,
            start_time: "2025-06-15T21:00:00.000Z",
            room: "Stora salongen",
            createdAt: "2023-05-25T13:09:54.278Z",
            updatedAt: "2023-05-25T13:09:54.278Z"
        }])
    })
})
Get Movie Screenings

Endpoint
GET /api/movies/:id/screenings
This endpoint retrieves all future screenings for a specific movie.

URL Parameters
id: Required. This is the unique identifier of the movie. It should be replaced with the actual ID of the movie for which you want to get the screenings.

Headers
No specific headers are required for this endpoint.

Request Body
No request body is required for this endpoint.

Response
This endpoint returns a JSON array of movie screenings. Each object in the array represents a movie screening and contains the following properties:

id: Integer. The unique identifier of the screening.
start_time: String (ISO 8601 date-time format). The start time of the screening. This is the date and time when the movie will be shown in the theater.
room: String. The name of the room where the screening will take place. This can be useful for attendees to find the location of the screening.
createdAt: String (ISO 8601 date-time format). The date and time when the screening was created in the database. This can be useful for administrative purposes.
updatedAt: String (ISO 8601 date-time format). The date and time when the screening was last updated in the database. This can be useful for tracking changes to the screening details.

The returned screenings are filtered to only include screenings that are in the future, and they are ordered by the start_time in ascending order.

Example of a GET request to the API

Request: GET /api/movies/5/screenings

Response:
[
{
"id": 224,
"start_time": "2024-02-08T12:00:00.000Z",
"room": "Stora salongen",
"createdAt": "2024-01-29T19:08:48.302Z",
"updatedAt": "2024-01-29T19:08:48.302Z"
},
{
"id": 227,
"start_time": "2024-02-11T12:00:00.000Z",
"room": "Stora salongen",
"createdAt": "2024-01-29T19:08:50.265Z",
"updatedAt": "2024-01-29T19:08:50.265Z"
},
{
"id": 230,
"start_time": "2024-02-12T19:00:00.000Z",
"room": "Stora salongen",
"createdAt": "2024-01-29T19:08:51.402Z",
"updatedAt": "2024-01-29T19:08:51.402Z"
},
{
"id": 241,
"start_time": "2024-02-17T17:00:00.000Z",
"room": "Stora salongen",
"createdAt": "2024-01-29T19:08:54.903Z",
"updatedAt": "2024-01-29T19:08:54.903Z"
},
{
"id": 245,
"start_time": "2024-02-19T21:00:00.000Z",
"room": "Stora salongen",
"createdAt": "2024-01-29T19:08:56.640Z",
"updatedAt": "2024-01-29T19:08:56.640Z"
}
]

Get recent movie screenings

Endpoint
GET /api/movies/recent-screenings
This endpoint retrieves all future screenings.

URL Parameters
No extra parameters are required.

Headers
No specific headers are required for this endpoint.

Request Body
No request body is required for this endpoint.

Response
This endpoint returns a JSON array of movie screenings. Each object in the array represents a movie screening and contains the following properties:

start_time: String (ISO 8601 date-time format). The start time of the screening. This is the time when the movie will be shown in the theater.
start_date: String (ISO 8601 date-time format). The start date of the screening. This is the date when the movie will be shown in the theater.
room: String. The name of the room where the screening will take place.
title: String The name of the movie that will be shown

The returned screenings are filtered to only include screenings that are in the future, and they are ordered by the start_time in ascending order.

Get Reviews for a Movie

Endpoint
GET /api/movies/id/?page=x&limit=x
This endpoint retrieves page x with x number of reviews for a specific movie.

URL Parameters
id: Required. This is the unique identifier of the movie. It should be replaced with the actual ID of the movie for which you want to get the reviews.

URL Query String
page=X to get reviews for a movie with id X:
Required. This is the unique identifier for the page with reviews.

limit=X to get X numbers of reviews per page.
Required. This is the unique identifier for how many reviews to be shown at one page.

Headers
No specific headers are required for this endpoint.

Request Body
No request body is required for this endpoint.

Response
This endpoint returns a JSON array of reviews for one movie and meta data for the pagination. Each review object in the array data object represents one review from one reviewer and contains the following properties:

data for one review:
id: Integer. The unique identifier of the review.
comment: String. Comment from the reviewer or “No comment”.
rating: Integer or string. The reviewer’s rating or “No rating”.
author: String. Signed by reviewer or “Anonymous”.
verified: Value. true or null.
createdAt: String (ISO 8601 date-time format). The date and time when the review was created in the database. This can be useful for administrative purposes.
updatedAt: String (ISO 8601 date-time format). The date and time when the review was last updated in the database. This can be useful for tracking changes to the review details.

the meta object:
meta:
page: Integer. The requested page number.
limit: Integer. The requested number of reviews/page.
pageCount: Integer. Total number of pages.
startIndex: Integer. 0 for the page.
endIndex: Integer. Same as the limit.
total. Integer. Total number of reviews for all pages.

The returned reviews are filtered to not include reviews that have been set to verified == false.

Post Reviews for a Movie

Endpoint
POST /api/movies/review
This endpoint POSTS a review to the database.

URL Parameters
NIL

URL Query String
Author, Grade and Comment will be sent with a query string.
These are required from the CMS-Api

Headers
This needs to be sent as an JSON object.
Request Body
JSON imbued body is required to retrieve a 200 status.
The Json needs to contain:
{
"data": {
"comment": "string",
"rating": 0,
"author": "string",
"verified": true,
"movie": "string or id",
"createdAt": "2024-02-08T21:08:34.505Z",
"updatedAt": "2024-02-08T21:08:34.505Z",
"createdBy": "string or id",
"updatedBy": "string or id"
}
}

Response
When the correct json is sent, the response will be status 200.

If there is a problem with writing the information to the db it will return status 500.

And if the response is not ok it will return a status 400 error..

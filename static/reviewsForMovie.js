let currentPage = 1; //shall always be 1!
let rows = 5; //change this for another pagination

//get one page of reviews for a movie
async function fetchMovieReviews(limit, page) {
    const currentPath = window.location.pathname;
    const base = window.location.origin;

    const queryReviews = "page=" + page + "&limit=" + limit;
    const url = base + "/api" + currentPath + "?" + queryReviews;
    const response = await fetch(url);
    const fetchedRevies = await response.json();
    return fetchedRevies;
};

//get elements
const reviewsList = document.querySelector(".movieInformation__oneReview");
const buttonArrows = document.querySelector(".movieInformation__reviewsArrows");
const buttonPagination = document.querySelector(".movieInformation__reviewsPagination");

//display reviews & buttons
async function displayMovieReviews(rows, page) {

    //for reviews
    reviewsList.textContent = "";

    let responseArray = await fetchMovieReviews(rows, page);
    let reviewsData = responseArray[0].data;
    let reviewsPageCount = responseArray[1].meta.pageCount;

    for (let i = 0; i < rows; i++) {
        let review = reviewsData[i];
        if (!review) {
            return;
        };
        let oneReview = document.createElement("p");
        oneReview.classList.add("movieInformation__oneReviewOpinion");
        oneReview.textContent = (`Rating: ${review.rating} -- ${review.comment} -- Author: ${review.author}`);
        reviewsList.appendChild(oneReview);
    };

    //for buttons
    buttonPagination.textContent = "";
    buttonArrows.textContent = "";

    //numbered buttons
    for (let i = 1; i < reviewsPageCount + 1; i++) {
        let btn = paginationButton(i);
        buttonPagination.appendChild(btn);
    };

    //prev & next buttons
    prevNextButtons(reviewsPageCount, page);
};

//create numbered button
function paginationButton(page) {
    let button = document.createElement("button");
    button.textContent = page;

    if (currentPage == page) {
        button.classList.add("active");
    };

    button.addEventListener("click", function () {
        currentPage = page;
        displayMovieReviews(rows, currentPage);
    });
    return button;
};

//create prev & next buttons
function prevNextButtons(reviewsPageCount, page) {
    const prev = document.createElement("button");
    const next = document.createElement("button");

    if (currentPage === reviewsPageCount) {
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrevNext");
        prev.addEventListener("click", function () {
            currentPage = page - 1;
            displayMovieReviews(rows, currentPage);
        });
        return buttonArrows.appendChild(prev);

    } else if (currentPage === 1) {
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsPrevNext");
        next.addEventListener("click", function () {
            currentPage = page + 1;
            displayMovieReviews(rows, currentPage);
        });
        return buttonArrows.appendChild(next);

    } else {
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrevNext");
        prev.addEventListener("click", function () {
            currentPage = page - 1;
            displayMovieReviews(rows, currentPage);
        });
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsPrevNext");
        next.addEventListener("click", function () {
            currentPage = page + 1;
            displayMovieReviews(rows, currentPage);
        });
        return buttonArrows.append(prev, next);
    };
};

displayMovieReviews(rows, currentPage);

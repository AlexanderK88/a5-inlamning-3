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

const reviewsList = document.querySelector(".movieInformation__oneReview");
const buttonArrows = document.querySelector(".movieInformation__reviewsArrows");
const buttonPagination = document.querySelector(".movieInformation__reviewsPagination");

async function displayMovieReviews(reviewsList, rows, page) {
    reviewsList.textContent = "";

    let responseArray = await fetchMovieReviews(rows, page);
    let reviewsData = responseArray[0].data;
    let reviewsPageCount = responseArray[1].meta.pageCount;

    for (let i = 0; i < rows; i++) {
                
        let review = reviewsData[i];
        let oneReview = document.createElement("p");
        oneReview.classList.add("movieInformation__oneReviewRating");
        oneReview.textContent = (`Rating: ${review.rating} "" ${review.comment} Author: "" ${review.author}`);

        reviewsList = appendChild(oneReview);
    }

    //for buttons
    //buttonPagination.textContent = "";
    buttonArrows.textContent ="";

    //numbered buttons
    /*for (let i = 1; i < reviewsPageCount + 1; i++) {
        let btn = paginationButton(i, /*reviewsPageCount*//*);
        buttonPagination.appendChild(btn);
    }*/

    //prev & next buttons
    const prev = document.createElement("button");
    const next = document.createElement("button");

    if (currentPage === reviewsPageCount) {
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrev");
        prev.addEventListener("click", function () {
            currentPage = page - 1;
            displayMovieReviews(reviewsList, rows, currentPage);
        });
        return buttonArrows.appendChild(prev);

    } else if (currentPage === 1) {
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsNext");
        next.addEventListener("click", function () {
            currentPage = page + 1;
            displayMovieReviews(reviewsList, rows, currentPage);
        });
        return buttonArrows.appendChild(next);

    } else {
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrev");
        prev.addEventListener("click", function () {
            currentPage = page - 1;
            displayMovieReviews(reviewsList, rows, currentPage);
        });
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsNext");
        next.addEventListener("click", function () {
            currentPage = page + 1;
            displayMovieReviews(reviewsList, rows, currentPage);
        });
        return buttonArrows.append(prev, next);
    }
}

/*function paginationButton(page, /*page_count*//*) {
    let button = document.createElement("button");
    button.textContent = page;

    if (currentPage == page) {
        button.classList.add("active");
    }

    button.addEventListener("click", function () {
        currentPage = page;
        displayMovieReviews(reviewsList, buttonPagination, rows, currentPage);
        let currentBtn = document.querySelector(".movieInformation__reviewsPagination button.active");
        currentBtn.classList.remove("active");
    });
    return button;
}*/

displayMovieReviews(reviewsList, rows, currentPage);


let current_page = 1; //shall always be 1!
let rows = 5; //change this for another pagination

//get one page of reviews for a movie
async function fetchMovieReviews(limit, page) {
    const currentPath = window.location.pathname;
    const base = window.location.origin;

    const queryReviews = "page=" + page + "&limit=" + limit;
    const url = base + "/api" + currentPath + "?" + queryReviews;
    const response = await fetch(url);
    const showMovieReviews = await response.json();
    return showMovieReviews;
}

const list_element = document.getElementById("list");
const button_element = document.querySelector(".movieInformation__reviewsArrows");
const pagination_element = document.getElementById("pagination");

async function displayList(wrapper, pagination_element, rows, page) {
    wrapper.textContent = "";

    let responseArray = await fetchMovieReviews(rows, page);
    let items = responseArray[0].data;
    let page_count = responseArray[1].meta.pageCount;
    //storePageCount(page_count);
    //console.log(reviews);
    console.log(page_count);
    for (let i = 0; i < rows; i++) {
        let item = items[i];
        let item_element = document.createElement("div");
        item_element.classList.add("item");
        item_element.textContent = (`Rating: ${item.rating} "" ${item.comment} Author: "" ${item.author}`);

        wrapper.appendChild(item_element);
    }

    //for buttons
    pagination_element.textContent = "";
    button_element.textContent ="";

    //numbered buttons
    /*for (let i = 1; i < page_count + 1; i++) {
        let btn = paginationButton(i, /*page_count*//*);
        pagination_element.appendChild(btn);
    }*/

    //prev & next buttons
    const prev = document.createElement("button");
    const next = document.createElement("button");
    if (current_page === page_count) {
       // button_element.removeChild(next) ="";
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrev");
        prev.addEventListener("click", function () {
            current_page = page - 1;
            displayList(list_element, pagination_element, rows, current_page);
        });
        return button_element.appendChild(prev);

    } else if (current_page === 1) {
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsNext");
        next.addEventListener("click", function () {
            current_page = page + 1;
            displayList(list_element, pagination_element, rows, current_page);
        });
        return button_element.appendChild(next);

    } else {
        prev.textContent = ("<");
        prev.classList.add("movieInformation__reviewsPrev");
        prev.addEventListener("click", function () {
            current_page = page - 1;
            displayList(list_element, pagination_element, rows, current_page);
        });
        next.textContent = (">");
        next.classList.add("movieInformation__reviewsNext");
        next.addEventListener("click", function () {
            current_page = page + 1;
            displayList(list_element, pagination_element, rows, current_page);
        });
        return button_element.append(prev, next);
    }
}

function paginationButton(page, /*page_count*/) {
    let button = document.createElement("button");
    button.textContent = page;

    if (current_page == page) {
        button.classList.add("active");
    }

    button.addEventListener("click", function () {
        current_page = page;
        displayList(list_element, pagination_element, rows, current_page);
        let current_btn = document.querySelector(".pagenumbers button.active");
        current_btn.classList.remove("active");
    });
    return button;
}

displayList(list_element, pagination_element, rows, current_page);

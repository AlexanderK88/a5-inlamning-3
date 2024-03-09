document.querySelectorAll(".movieGrade").forEach((span) => {
  span.addEventListener("click", function () {
    // Get the index of the clicked span
    let index = Array.from(this.parentElement.children).indexOf(this) + 1;
    // Set the aria-valuenow attribute to the index
    this.parentElement.setAttribute("aria-valuenow", index);
  });
});

const postBtn = document.querySelector("#postBtn");
const reviewForm = document.getElementById("reviewForm");

postBtn.addEventListener("click", async () => {
  event.preventDefault();
  const reviewComment = document.querySelector("#reviewMsg").value;
  let revcom = reviewComment;
  const ratingElement = document.querySelector(".review__rating");
  const rating = ratingElement.getAttribute("aria-valuenow");
  const nameOfAuthor = document.querySelector("#reviewName").value;
  let noa = document.querySelector("#reviewName");

  // Get the current URL
  const currentUrl = window.location.href;

  // Split the URL by "/"
  const parts = currentUrl.split("/");

  // Extract the last part of the URL, which should be "8"
  const movieId = parts[parts.length - 1];

  const data = new URLSearchParams();
  data.append("id", movieId);
  data.append("comment", reviewComment);
  data.append("rating", rating);
  data.append("author", nameOfAuthor);

  console.log(data);

  const response = await fetch(`/api/movies/review`, {
    method: "POST",
    body: data,
  });
  if (response.ok) {
    const reviewComment = (document.querySelector("#reviewMsg").value = "");
    const nameOfAuthor = (document.querySelector("#reviewName").value = "");
  }
});

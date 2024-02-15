export default async function fetchRatings() {
  const currentPath = window.location.pathname;
  const base = window.location.origin;
  const url = new URL("/api" + currentPath + "/rating", base);
  const response = await fetch(url);
  const averageValue = await response.json();
  return averageValue;
}
const hihi = fetchRatings();
console.log(hihi);
const text = document.querySelector(".testarFetch");
const slängin = "nu funkar det";

text.append(`${slängin}`);

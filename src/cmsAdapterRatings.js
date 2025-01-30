export default async function loadAllRatings(id) {
  const API_address =
    "https://plankton-app-xhkom.ondigitalocean.app/api/reviews?populate=movie&filters[movie]=";

  const response = await fetch(API_address + id);
  const payload = await response.json();

  return payload.data;
}

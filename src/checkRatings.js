import getOMDB from "./getOMDB.js";

export default async function Ratings(data) {
  if (data.length > 4) {
    const ratings = data
      .map((review) => review.attributes.rating)
      .filter((rating) => rating !== null);

    const total = ratings.reduce((sum, rating) => sum + rating, 0);
    const average = total / ratings.length;

    return average;
  } else {
    return getOMDB(data);
  }
}

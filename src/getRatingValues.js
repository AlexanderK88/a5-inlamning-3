export default async function getAverageRatings(cmsAdapterTEST1) {
  const ratings = cmsAdapterTEST1.loadAllRatings();
  return ratings;
}

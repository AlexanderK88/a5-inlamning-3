export default async function getRecentScreenings(cmsScreenings) {
  const screenings = await cmsScreenings.loadAllScreenings();

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  return screenings
    .filter((screening) => {
      const startDate = new Date(screening.attributes.start_time);
      return startDate < fiveDaysFromNow;
    })
    .slice(0, 10);
}

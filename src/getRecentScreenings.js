export default async function getRecentScreenings(cmsAdapterRecentScreenings) {
  const screenings = await cmsAdapterRecentScreenings.loadAllScreenings();

  //Provides the current date as a base
  const currentDate = new Date();

  const fiveDaysFromNow = new Date();
  fiveDaysFromNow.setDate(fiveDaysFromNow.getDate() + 5);

  return screenings
    .filter((screening) => {
      const startDate = new Date(screening.attributes.start_time);
      // Make sure the screening times is after the current date
      const afterCurrentDate = startDate >= currentDate;
      // Make sure the screening times are not more then 5 days in the future
      const beforeFiveDays = startDate <= fiveDaysFromNow;

      return afterCurrentDate && beforeFiveDays;
    })
    .slice(0, 10);
}

const cmsAdapterRecentScreenings = {
  async loadAllScreenings() {
    const initialResponse = await fetch(
      "https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie",
    );

    const initialData = await initialResponse.json();
    const totalItems = initialData.meta.pagination.total;

    const pagnatedResponse = await fetch(
      `https://plankton-app-xhkom.ondigitalocean.app/api/screenings?populate=movie&pagination[pageSize]=${totalItems}`,
    );

    const payload = await pagnatedResponse.json();
    return payload.data;
  },
};

export default cmsAdapterRecentScreenings;

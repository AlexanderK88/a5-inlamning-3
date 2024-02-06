import fetch from "node-fetch";

const API_BASE = "https://plankton-app-xhkom.ondigitalocean.app/api";

const cmsAdapter = {
  async loadAllMovieScreenings(id) {
    try {
      const res = await fetch(`${API_BASE}/screenings?filters[movie]=${id}`);
      const payload = await res.json();
      return payload;
    } catch (error) {
      console.log(error);
    }
  },
};

export default cmsAdapter;

import http from "./http";

export const TmdbService = {
  async getPopularMovies(page = 1) {
    const res = await http.get(`/tmdb/popular?page=${page}`);
    return res.data;
  },

  async getTopRatedMovies() {
    const res = await http.get(`/tmdb/top`);
    return res.data;
  },

  async getPopularSeries(page = 1) {
    const res = await http.get(`/tmdb/series?page=${page}`);
    return res.data;
  },

  async searchMulti(query: string) {
    const res = await http.get(`/tmdb/search-multi?q=${query}`);
    return res.data;
  }
};
export function isAdmin(): boolean {
  try {
    const user = localStorage.getItem("user");
    if (!user) return false;

    const parsed = JSON.parse(user);
    return parsed?.role === "Admin";
  } catch {
    return false;
  }
}

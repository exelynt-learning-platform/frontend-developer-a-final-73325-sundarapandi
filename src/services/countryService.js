import api from "./api";

export const countryService = {
  async getAll() {
    const response = await api.get("/country");
    return response.data;
  }
};

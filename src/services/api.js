import axios from "axios";

export const API_BASE_URL =
  "https://669b3f09276e45187d34eb4e.mockapi.io/api/v1";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
  timeout: 15000
});

export default api;

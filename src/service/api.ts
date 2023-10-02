import axios from "axios";

export const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASEURL
});

const setToken = api.interceptors.request.use(
  async (config) => {
    const token = localStorage.getItem("access_token");
    if (token) {
      config.headers["Authorization"] = ` Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
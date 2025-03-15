import axios from "axios";

// Base API URL
const API_BASE_URL = "http://localhost:8000/api";

// Create an Axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to attach token (except for login)
api.interceptors.request.use(
  (config) => {
    // Skip adding token for login requests
    if (!config.url.includes("/login")) {
      const token = localStorage.getItem("dsquare_token");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Export the configured Axios instance
export default api;

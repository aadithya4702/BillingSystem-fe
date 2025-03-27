import axios from "axios";
import { toast } from "react-toastify";

// Base API URL
const API_BASE_URL = "https://d2square-server.d2delight.com/api";

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

// Add a response interceptor to handle 401 errors globally
api.interceptors.response.use(
  (response) => response, // Pass successful responses through
  (error) => {
    if (error.response?.status === 401) {
      // Unauthorized, force logout
      toast.error("Session expired. Please log in again!", {
        position: "top-right",
      });
      console.log("401 reaigh");

      localStorage.removeItem("dsquare_token");
      localStorage.removeItem("dsquare_valid_truck");
      localStorage.removeItem("dsquare_name"); // Clear stored token
      window.location.href = "/auth"; // Redirect to login page
    }

    return Promise.reject(error);
  }
);

// Export the configured Axios instance
export default api;

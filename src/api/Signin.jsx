import { toast } from "react-toastify";
import api from "./axiosInstance";

export const registerUser = async (userData) => {
  try {
    const response = await api.post("/account", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await api.post("/login", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const getTruckDetails = async () => {
  try {
    const token = localStorage.getItem("dsquare_token"); // Get token dynamically
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }

    const response = await api.get("/trucks", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach updated token
      },
    });

    return response;
  } catch (error) {
    handleError(error);
  }
};

export const logout = async () => {
  try {
    const token = localStorage.getItem("dsquare_token"); // Get token dynamically
    if (!token) {
      throw new Error("No token found. Please log in again.");
    }
    const response = await api.post("/logout", {
      headers: {
        Authorization: `Bearer ${token}`, // Attach updated token
      },
    });
    return response;
  } catch (error) {
    handleError(error);
  }
};

// Centralized Error Handling Function
const handleError = (error) => {
  if (error.response) {
    const { data } = error.response;
    toast.error(data.message || "An error occurred", {
      position: "top-right",
    });
  } else {
    toast.error("Network error. Please try again later.", {
      position: "top-right",
    });
  }
};

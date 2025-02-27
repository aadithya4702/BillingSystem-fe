import Axios from "axios";
import { toast } from "react-toastify";

Axios.defaults.baseURL = "https://65.0.176.95/api";
Axios.defaults.withCredentials = true;

export const registerUser = async (userData) => {
  try {
    const response = await Axios.post("/account", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

export const loginUser = async (userData) => {
  try {
    const response = await Axios.post("/login", userData);
    return response;
  } catch (error) {
    handleError(error);
  }
};

const handleError = (error) => {
  if (error.response) {
    const { status, data } = error.response;
    toast.error(data.message || "An error occurred", {
      position: toast.POSITION.TOP_RIGHT,
    });
  } else {
    toast.error("Network error. Please try again later.", {
      position: toast.POSITION.TOP_RIGHT,
    });
  }
};

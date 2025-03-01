import api from "./axiosInstance";

export const getDishes = async () => {
  try {
    const response = await api.get("/food-items");
    return response.data;
  } catch (error) {
    console.error("Error fetching dishes:", error);
    return [];
  }
};

export const addDish = async (dishData) => {
  try {
    const response = await api.post("/food-items", dishData);
    return response.data;
  } catch (error) {
    console.error("Error adding dish:", error);
    return null;
  }
};

export const updateDish = async (id, dishData) => {
  try {
    const response = await api.put(`/food-items/${id}`, dishData);
    return response.data;
  } catch (error) {
    console.error("Error updating dish:", error);
    return null;
  }
};

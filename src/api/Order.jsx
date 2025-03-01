import api from "./axiosInstance";

export const placeOrder = async (orderData) => {
  try {
    const response = await api.post("/orders", orderData);
    return response.data;
  } catch (error) {
    console.error("Error adding order:", error);
    return [];
  }
};

// export const addDish = async (dishData) => {
//   try {
//     const response = await api.post("/food-items", dishData);
//     return response.data;
//   } catch (error) {
//     console.error("Error adding dish:", error);
//     return null;
//   }
// };

// export const updateDish = async (id, dishData) => {
//   try {
//     const response = await api.put(`/food-items/${id}`, dishData);
//     return response.data;
//   } catch (error) {
//     console.error("Error updating dish:", error);
//     return null;
//   }
// };

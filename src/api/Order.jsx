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

export const fetchOrder = async (orderId) => {
  try {
    const response = await api.get(`/orders/${orderId}`);
    return response;
  } catch (error) {
    console.error("Error fetching order:", error);
    return null;
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

export const updateOrderById = async (orderData, orderId) => {
  try {
    const response = await api.put(`/orders/${orderId}`, orderData);
    return response.data;
  } catch (error) {
    console.error("Error updating dish:", error);
    return null;
  }
};

export const deleteOrderById = async (orderId) => {
  try {
    const response = await api.delete(`/orders/${orderId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting order:", error);
    return null;
  }
};

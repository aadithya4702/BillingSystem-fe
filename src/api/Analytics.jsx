import api from "./axiosInstance";

export const getMostOrders = async (filter) => {
  try {
    const response = await api.post(
      `/orders/food/most-ordered-food?filter=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mostOrders:", error);
    return [];
  }
};

export const getRecentOrders = async (filter) => {
  try {
    const response = await api.post(
      `/orders/food/total_food_orders?filter=${filter}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching mostOrders:", error);
    return [];
  }
};

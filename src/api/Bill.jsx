import api from "./axiosInstance";

export const generateBill = async (orderId) => {
  try {
    const response = await api.get(`/orders/receipt-pdf/${orderId}`, {
      responseType: "arraybuffer", // Important for binary data
    });

    // Convert to Blob
    const blob = new Blob([response.data], { type: "application/pdf" });

    return blob;
  } catch (error) {
    console.error("Error generating bill:", error);
    return null;
  }
};

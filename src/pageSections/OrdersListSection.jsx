import { useEffect, useState } from "react";
import api from "../api/axiosInstance"; // Import API instance
import { toast } from "react-toastify";

const OrdersListSection = () => {
  const [orders, setOrders] = useState([]);
  const [editingOrder, setEditingOrder] = useState(null); // Track order being edited
  const [updatedItems, setUpdatedItems] = useState([]);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await api.get("/orders");
      console.log("API Response:", response.data); // Debugging step

      const ordersData = response?.data?.data || []; // ✅ Ensure fallback to empty array
      setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching orders:", error);
      setOrders([]); // ✅ Prevent `undefined`
    }
  };

  // Function to print bill
  const printBill = async (orderId) => {
    try {
      const response = await api.get(`/orders/receipt-pdf/${orderId}`, {
        responseType: "arraybuffer",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);
      const iframe = document.createElement("iframe");

      iframe.style.display = "none";
      iframe.src = url;

      document.body.appendChild(iframe);
      iframe.onload = () => {
        iframe.contentWindow.print();
      };
    } catch (error) {
      console.error("Error printing bill:", error);
    }
  };

  // Function to cancel an order
  const cancelOrder = async (orderId) => {
    try {
      await api.put(`/orders/${orderId}/cancel`);
      setOrders(
        orders.map((order) =>
          order.id === orderId ? { ...order, status: "cancelled" } : order
        )
      );
      toast.success("Order cancelled successfully");
    } catch (error) {
      console.error("Error cancelling order:", error);
    }
  };

  // Function to edit an order
  const editOrder = (order) => {
    setEditingOrder(order);
    setUpdatedItems(order);
  };

  // Function to update an order
  const updateOrder = async () => {
    try {
      await api.put(`/orders/${editingOrder.id}`, { items: updatedItems });
      setOrders(
        orders.map((order) =>
          order.id === editingOrder.id
            ? { ...order, items: updatedItems }
            : order
        )
      );
      setEditingOrder(null);
      toast.success("Order updated successfully");
    } catch (error) {
      console.error("Error updating order:", error);
    }
  };

  return (
    <div className="container h-full overflow-y-auto custom-scrollbar mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Recent Orders</h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300">
          <thead>
            <tr className="bg-gray-200">
              <th className="p-2 border">Order ID</th>
              <th className="p-2 border">Items</th>
              <th className="p-2 border">Total</th>
              <th className="p-2 border">Status</th>
              <th className="p-2 border">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id} className="border">
                <td className="p-2 text-center">{order.id}</td>

                {order.metadata.map((item) => (
                  <td className="p-2 text-center">
                    <div key={item.food_id}>
                      {item.name} - {item.quantity} x {item.price}
                    </div>
                  </td>
                ))}

                <td className="p-2 text-center">
                  $
                  {order.metadata.reduce(
                    (total, item) => total + item.subtotal,
                    0
                  )}
                </td>
                <td className="p-2 text-center">
                  <span
                    className={`px-2 py-1 rounded ${
                      order.status === "completed"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="p-2 flex justify-center gap-2">
                  <button
                    onClick={() => printBill(order.id)}
                    className="px-3 py-1 bg-blue-500 text-white rounded"
                  >
                    Print Bill
                  </button>
                  {order.status !== "cancelled" && (
                    <button
                      onClick={() => cancelOrder(order.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded"
                    >
                      Cancel
                    </button>
                  )}
                  <button
                    onClick={() => editOrder(order)}
                    className="px-3 py-1 bg-yellow-500 text-white rounded"
                  >
                    Edit
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Order Modal */}
      {editingOrder && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-bold mb-2">Edit Order</h3>
            {updatedItems.map((item, index) => (
              <div key={item.food_id} className="mb-2">
                <span>{item.name}</span>
                <input
                  type="number"
                  value={item.quantity}
                  onChange={(e) => {
                    const newItems = [...updatedItems];
                    newItems[index].quantity = Number(e.target.value);
                    setUpdatedItems(newItems);
                  }}
                  className="ml-2 p-1 border rounded w-16"
                />
              </div>
            ))}
            <div className="mt-4 flex justify-end gap-2">
              <button
                onClick={() => setEditingOrder(null)}
                className="px-3 py-1 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
              <button
                onClick={updateOrder}
                className="px-3 py-1 bg-green-500 text-white rounded"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrdersListSection;

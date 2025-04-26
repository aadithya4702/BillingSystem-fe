import React from "react";
import { generateBill } from "../api/Bill";
import { toast } from "react-toastify";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import { deleteOrderById } from "../api/Order";

const OrderPreviewModal = ({ isOpen, onClose, foodOrder, foodOrderItem }) => {
  if (!isOpen) return null;

  const order = foodOrder[0]; // assuming single order
  const items = foodOrderItem[0]?.metadata || [];

  const deleteOrder = async (orderId) => {
    try {
      const res = await deleteOrderById(orderId);
      if (res.success) {
        toast.success("Order deleted");
        onClose();
      }
    } catch (err) {
      toast.error("Failed to delete order");
      console.error(err);
    }
  };

  const handlePrintReceipt = async (receiptId) => {
    try {
      const bill = await generateBill(receiptId); // Use passed `receiptId` instead of hardcoded one

      if (bill) {
        toast.success("Bill generated");
        printBillDirectly(bill);
        onClose();
      } else {
        console.error("Bill generation returned no data.");
        toast.error("Failed to generate bill. Please try again.");
      }
    } catch (error) {
      console.error("Error printing receipt:", error);
      toast.error("An error occurred while printing the receipt.");
    }
  };

  const printBillDirectly = async (blob) => {
    try {
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64data = reader.result.split(",")[1]; // Extract base64 content
        const folderPath = "documents"; // Folder where the PDF will be stored
        const fileName = `receipt_${Date.now()}.pdf`;
        const filePath = `${folderPath}/${fileName}`;

        // 1️⃣ Ensure the folder exists before writing the file
        try {
          await Filesystem.readdir({
            path: folderPath,
            directory: Directory.Documents,
          });
        } catch (e) {
          await Filesystem.mkdir({
            path: folderPath,
            directory: Directory.Documents,
            recursive: true,
          });
        }

        // 2️⃣ Save the PDF file in the device storage
        await Filesystem.writeFile({
          path: filePath,
          data: base64data,
          directory: Directory.Documents,
          encoding: Encoding.Base64,
        });

        // 3️⃣ Get file URI
        const fileUri = await Filesystem.getUri({
          path: filePath,
          directory: Directory.Documents,
        });

        // 4️⃣ Open the file using Android's share menu (includes print option)
        await Share.share({
          title: "Print Receipt",
          url: fileUri.uri,
          dialogTitle: "Open PDF & Print",
        });
      };

      reader.readAsDataURL(blob); // Convert blob to base64
    } catch (error) {
      console.error("Error printing bill:", error);
    }
  };

  return (
    <div className="fixed inset-0  bg-black bg-opacity-50 flex items-center justify-center z-50 px-2">
      <div className="bg-custom-dark-purple text-white rounded-xl shadow-lg max-w-md w-full sm:max-w-2xl overflow-auto max-h-[90vh]">
        <div className="flex justify-between items-center p-4 border-b">
          <h2 className="text-xl font-semibold">Order Preview</h2>

          <button
            onClick={onClose}
            className="text-gray-500 hover:text-red-500 transition"
          >
            ✖
          </button>
        </div>

        <div className="p-4 space-y-4">
          {/* Order Info */}
          <div>
            <p>
              <strong>Order ID:</strong> {order.order_id}
            </p>

            <p>
              <strong>Payment Type:</strong> {order.payment_type}
            </p>

            <p>
              <strong>Date:</strong>{" "}
              {new Date(order.created_at).toLocaleString()}
            </p>
          </div>

          {/* Item Table */}
          <div>
            <h3 className="text-lg font-semibold mb-2">Items</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full text-sm border">
                <thead>
                  <tr className="bg-orange-400">
                    <th className="py-2 px-3 border">Id</th>
                    <th className="py-2 px-3 border text-left">Name</th>
                    <th className="py-2 px-3 border">Qty</th>
                    <th className="py-2 px-3 border">Price</th>
                    <th className="py-2 px-3 border">Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {items.map((item, idx) => (
                    <tr key={idx}>
                      <td className="py-1 px-3 border text-center">
                        {idx + 1}
                      </td>
                      <td className="py-1 px-3 border">{item.name}</td>
                      <td className="py-1 px-3 border text-center">
                        {item.quantity}
                      </td>
                      <td className="py-1 px-3 border text-center">
                        ₹{item.price}
                      </td>
                      <td className="py-1 px-3 border text-center">
                        ₹{item.subtotal}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Total */}
          <div className="text-right font-bold text-lg">
            Total: ₹{order.total_amount}
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-2 pt-2">
            <button
              onClick={onClose}
              className="px-4 py-2 rounded border border-gray-200 hover:border-red-500 hover:text-red-500  transition"
            >
              Close
            </button>
            <button
              onClick={() => deleteOrder(order.order_id)}
              className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-600 transition"
            >
              Delete
            </button>
            <button
              onClick={() => handlePrintReceipt(order.order_id)}
              className="px-4 py-2 rounded bg-green-500 text-white hover:bg-green-600 transition"
            >
              Print
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderPreviewModal;

import { useState, useEffect } from "react";
import { Search, Trash, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { getDishes } from "../api/Dishes";
import { placeOrder } from "../api/Order";
import { toast } from "react-toastify";
import EmptyCart from "../assets/empty_cart.svg";
import { generateBill } from "../api/Bill";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Filesystem, Directory, Encoding } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import {
  faWallet,
  faMoneyBillTransfer,
  faCreditCard,
} from "@fortawesome/free-solid-svg-icons";

const OrderSection = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Toggle state
  const [products, setProducts] = useState([]); // Store products from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [selectedPayment, setSelectedPayment] = useState("cash");
  const [showCart, setShowCart] = useState(true);
  const categoriesData = [
    "Veg",
    "Non-Veg",
    "Veg",
    "Non-Veg",
    "Veg",
    "Non-Veg",
    "Veg",
    "Non-Veg",
    "Veg",
    "Non-Veg",
    "Veg",
    "aaaaaaaaaaaaaaaaaaaaaaaa",
  ];
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true); // Start loading
        const response = await getDishes();
        const productData = response.data;

        if (Array.isArray(productData)) {
          const formattedData = productData.map((product) => ({
            ...product,
            price: parseFloat(product.price) || 0, // Ensure price is a number
          }));
          setProducts(formattedData);
        } else {
          throw new Error("Invalid product data format");
        }
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false); // Ensure loading is stopped
      }
    };

    fetchProducts();
  }, []);

  const orderSubmit = async () => {
    try {
      const truckData = localStorage.getItem("dsquare_valid_truck");

      if (!truckData) {
        throw new Error("No truck data found. Please log in again.");
      }

      const truck = JSON.parse(truckData);

      if (!truck.id) {
        throw new Error("Invalid truck data. Please log in again.");
      }

      if (selectedPayment == "") {
        toast.error("Select payment to checkout");
        return;
      }

      const formattedOrder = {
        customer_number: "1235",
        status: "completed",
        truck_id: truck.id,
        payment_type: selectedPayment,
        orders: cart.map((item) => ({
          food_id: item.id,
          quantity: item.qty,
          price: item.price,
          subtotal: item.qty * item.price,
        })),
      };

      const response = await placeOrder(formattedOrder);

      if (response.success) {
        toast.success("Order created");

        const bill = await generateBill(response.data[0].id);
        if (bill) {
          printBillDirectly(bill);
        } else {
          throw new Error("Error generating bill");
        }

        setCart([]); // Clear cart after successful order
      } else {
        toast.error("Order failed");
        throw new Error("Failed to submit order");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
    }
  };

  const handlePaymentChange = (e) => {
    setSelectedPayment(e.target.id);
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

  const addToCart = (product) => {
    setCart((prev) => {
      const existing = prev.find((item) => item.id === product.id);
      if (existing) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
  };

  const removeFromCart = (id) => {
    setCart((prev) => prev.filter((item) => item.id !== id));
  };

  const updateQty = (id, qty) => {
    setCart((prev) =>
      prev.map((item) => (item.id === id ? { ...item, qty } : item))
    );
  };

  const filteredProducts = products.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  );

  const subtotal = cart
    .reduce((acc, item) => acc + (parseFloat(item.price) || 0) * item.qty, 0)
    .toFixed(2);

  // Function to get formatted date
  const getFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "long", // Full weekday name (e.g., 'Tuesday')
      day: "numeric", // Numeric day (e.g., '2')
      month: "short", // Abbreviated month (e.g., 'Feb')
      year: "numeric", // Full year (e.g., '2021')
    };

    // Format the date and return it
    return date.toLocaleDateString("en-GB", options);
  };

  return (
    <div className="flex  flex-col md:flex-row max-h-screen md:pb-0 pb-20   overflow-y-auto bg-gray-900 text-white">
      {/* Main Content */}
      <main className="w-full  flex-1 pb-6 pl-6 custom-scrollbar mb-10 overflow-auto">
        <div className="mb-4 bg-gray-900 p-4 sticky top-0 z-10">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Left Section - Title & Date */}
            <div>
              <h1 className="text-lg  md:text-2xl font-bold">Choose Dishes</h1>
              <p className="text-xs sm:text-sm md:text-md text-input-text-color">{`${getFormattedDate()}`}</p>
            </div>

            {/* Right Section - Search Bar */}
            <div className="relative w-full  ">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                className="pl-10 pr-4 py-2.5 bg-gray-700 text-white rounded w-full"
                placeholder="Search for food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 pr-6 relative sm:grid-cols-1 lg:grid-cols-3 md:grid-cols-2 gap-6">
          {filteredProducts.map((product) => {
            const cartItem = cart.find((item) => item.id === product.id);

            return (
              <div
                key={product.id}
                className="bg-gray-800 p-6 mt-10 pt-16 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 transform hover:scale-105 cursor-pointer border border-gray-700 relative"
              >
                {/* Floating Circular Image */}
                <div className="w-full flex justify-center absolute top-[-40px] left-1/2 transform -translate-x-1/2">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="rounded-full object-cover h-[100px] w-[100px] bg-black border-4 border-gray-800 shadow-md"
                  />
                </div>
                <h2
                  className="lg:text-lg text-sm font-light text-white text-center mt-3 text-ellipsis whitespace-normal overflow-hidden"
                  title={`${product.name}`}
                >
                  {product.name}
                </h2>
                <p className="text-gray-300 lg:text-lg text-sm  font-medium mt-1 text-center">
                  ₹ {product.price.toFixed(2)}
                </p>
                {/* <div className="flex justify-center">
                  <p
                    className="text-sm text-gray-500  truncate overflow-hidden whitespace-nowrap max-w-[200px]"
                    title={`${product.description}`}
                  >
                    {product.description}
                  </p>
                </div> */}

                {/* Cart Controls */}
                <div className="mt-4 ">
                  {cartItem && cartItem.qty > 0 ? (
                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-center gap-5  p-2 rounded-lg w-full">
                        {/* Decrease Quantity */}
                        <button
                          className="bg-red-500 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() => {
                            const newQty = Math.max(cartItem.qty - 1, 0);
                            if (newQty === 0) {
                              // Remove item from cart if quantity is 0
                              removeFromCart(product.id);
                            } else {
                              updateQty(product.id, newQty);
                            }
                          }}
                        >
                          -
                        </button>

                        {/* Quantity Display */}
                        <span className="text-white font-semibold ">
                          {cartItem.qty}
                        </span>

                        {/* Increase Quantity */}
                        <button
                          className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg"
                          onClick={() =>
                            updateQty(product.id, cartItem.qty + 1)
                          }
                        >
                          +
                        </button>
                      </div>

                      {/* Delete Button */}
                      {/* <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg ml-2"
                        onClick={() => removeFromCart(product.id)}
                      >
                        🗑️
                      </button> */}
                    </div>
                  ) : (
                    <button
                      className={`w-full py-2 rounded-lg transition-colors duration-300 ${
                        product.is_available
                          ? "bg-highlight-bg-icon hover:bg-red-500 text-white"
                          : "bg-gray-600 text-gray-400 cursor-not-allowed"
                      }`}
                      onClick={() => addToCart(product)}
                      disabled={!product.is_available}
                    >
                      {product.is_available ? "Add to cart" : "Not Available"}
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside
        className={`fixed bottom-14 md:top-0 left-0  w-full md:w-2/5 lg:w-1/3 bg-gray-800 md:p-2 p-6 transition-all duration-300 md:relative md:h-screen md:overflow-auto flex flex-col z-20 ${
          showCart ? "h-1/3 overflow-y-auto" : "h-[50px]"
        }`}
      >
        {/* Orders Header & Toggle Button */}
        {/* Title for Small Screens (Collapsible) */}
        <div
          className="flex justify-between  items-center cursor-pointer md:hidden"
          onClick={() => setShowCart(!showCart)}
        >
          <h2 className="text-xl font-bold  text-white">Orders</h2>
          <button className="text-white">
            {showCart ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>

        {/* Title for Large Screens (Always Visible) */}
        <h2 className="hidden mt-5 md:block text-xl  font-bold text-white  mb-4">
          # Orders
        </h2>

        {/* Order Items (Show only when expanded) */}
        <div
          className={`mt-4 space-y-4 min-h-[200px] custom-scrollbar transition-all duration-300 ${
            showCart ? "overflow-y-auto flex-1" : "hidden"
          }`}
        >
          {cart.length > 0 ? (
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
              <table className="w-full border-collapse text-white">
                {/* Table Header - Fixed */}
                <thead className="border-b border-input-text-color bg-gray-800 sticky top-0 z-10">
                  <tr className="text-sm font-medium">
                    <th className="p-2 text-left">Item</th>
                    <th className="p-2 text-center">Qty</th>
                    <th className="p-2 text-right">Price</th>
                  </tr>
                </thead>

                {/* Table Body - Scrollable */}
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="border-b border-gray-600">
                      {/* Item Name (Ellipses for long names) */}
                      <td className="p-2 max-w-[120px] truncate">
                        <span className="block text-xs md:w-[70px] w-[50px] overflow-hidden text-ellipsis whitespace-nowrap">
                          {item.name}
                        </span>
                        <p className="text-xs text-gray-400">
                          ₹{item.price.toFixed(2)}
                        </p>
                      </td>

                      {/* Quantity Control */}
                      <td className="p-2 text-center text-sm flex items-center justify-center gap-1">
                        <button
                          className="bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-lg hover:bg-red-600"
                          onClick={() => {
                            const newQty = Math.max(item.qty - 1, 0);
                            if (newQty === 0) {
                              removeFromCart(item.id); // Remove item if quantity is 0
                            } else {
                              updateQty(item.id, newQty);
                            }
                          }}
                        >
                          -
                        </button>

                        <span className="text-white mx-1 text-center">
                          {item.qty}
                        </span>

                        <button
                          className="bg-green-500 text-white w-6 h-6 flex items-center justify-center rounded-lg hover:bg-green-600"
                          onClick={() => updateQty(item.id, item.qty + 1)}
                        >
                          +
                        </button>
                      </td>

                      {/* Price */}
                      <td className="p-2 text-right text-sm">
                        ₹{(item.price * item.qty).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div>
              <div className="md:flex items-center mb-3 justify-center hidden">
                <img src={EmptyCart} alt="" className="w-3/4" />
              </div>
              <p className="text-center text-gray-400">Your cart is empty.</p>
            </div>
          )}
        </div>

        {showCart && cart.length > 0 && (
          <div className="mt-4 p-3  border-t border-gray-700">
            <h3 className="text-white text-sm font-semibold mb-2">
              Payment Method
            </h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: "cash", label: "Cash", icon: faWallet },
                { id: "upi", label: "UPI", icon: faMoneyBillTransfer },
                { id: "card", label: "Card", icon: faCreditCard },
              ].map((method) => (
                <label
                  key={method.id}
                  className={`flex flex-col relative items-center justify-center gap-2 text-white text-sm p-3 rounded-lg cursor-pointer w-full sm:w-auto transition-all duration-300 
            ${
              selectedPayment === method.id
                ? " bg-icon-color"
                : "bg-gray-600 hover:bg-gray-500"
            }`}
                >
                  <input
                    type="radio"
                    name="payment"
                    id={method.id}
                    className=" absolute top-1 right-1 "
                    checked={selectedPayment === method.id}
                    onChange={handlePaymentChange}
                  />
                  <FontAwesomeIcon icon={method.icon} className="text-xs" />
                  <span className="text-xs">{method.label}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Checkout Section (Only when expanded & items in cart) */}
        {showCart && cart.length > 0 && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <p className="text-lg font-semibold text-white">
              Subtotal: ₹{subtotal}
            </p>
            <button
              onClick={orderSubmit}
              className="w-full mt-2 bg-highlight-bg-icon hover:bg-red-600 p-2 rounded"
            >
              Checkout
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default OrderSection;

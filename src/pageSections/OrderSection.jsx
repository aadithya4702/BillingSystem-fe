import { useState, useEffect } from "react";
import { Search, Trash, ChevronDown, ChevronUp } from "lucide-react";
import React from "react";
import { getDishes } from "../api/Dishes";
import { placeOrder } from "../api/Order";
import { toast } from "react-toastify";

const OrderSection = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Toggle state
  const [products, setProducts] = useState([]); // Store products from API
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
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
      const truckData = localStorage.getItem("dsquare_valid_truck"); // Get truck data
      if (!truckData) {
        throw new Error("No truck data found. Please log in again.");
      }

      const truck = JSON.parse(truckData); // Parse the string

      if (!truck.id) {
        throw new Error("Invalid truck data. Please log in again.");
      }

      const formattedOrder = {
        customer_number: "9876543210", // Replace this with the actual customer number
        status: "completed",
        truck_id: truck.id,
        orders: cart.map((item) => ({
          food_id: item.id,
          quantity: item.qty,
          price: item.price,
          subtotal: item.qty * item.price,
        })),
      };

      console.log("Final Order Data:", formattedOrder);

      // Send the data to the backend
      const response = await placeOrder(formattedOrder);

      if (response) {
        toast.success("Order created");
        setCart([]);
      } else {
        throw new Error("Failed to submit order");
      }
    } catch (err) {
      console.error("Error submitting order:", err);
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
    <div className="flex flex-col md:flex-row max-h-screen md:pb-0 pb-20   overflow-y-auto bg-gray-900 text-white">
      {/* Main Content */}
      <main className="w-full  flex-1 pb-6 pl-6 custom-scrollbar mb-10 overflow-auto">
        <div className="mb-4 bg-gray-900 p-4 sticky top-0 z-10">
          <div className="flex flex-col md:flex-row  justify-between ">
            <div>
              <h1 className="text-2xl md:text-lg font-bold">Choose Dishes</h1>
              <p className="text-sm sm:text-md text-input-text-color ">{`${getFormattedDate()}`}</p>
            </div>
            <div className="relative mt-2 md:mt-0">
              <Search className="absolute left-3 top-2.5 text-gray-400" />
              <input
                className="pl-10 bg-gray-700 text-white p-2 rounded w-full md:w-auto"
                placeholder="Search for food..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 pr-6 relative sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-6">
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
                    className="rounded-full object-cover h-[120px] w-[120px] border-4 border-gray-800 shadow-md"
                  />
                </div>
                <h2 className="text-lg font-semibold text-white text-center mt-8">
                  {product.name}
                </h2>
                <p className="text-gray-400 font-medium mt-1 text-center">
                  ${product.price.toFixed(2)}
                </p>
                <div className="flex justify-center">
                  <p
                    className="text-sm text-gray-500  truncate overflow-hidden whitespace-nowrap max-w-[200px]"
                    title={`${product.description}`}
                  >
                    {product.description}
                  </p>
                </div>

                {/* Cart Controls */}
                <div className="mt-4">
                  {cartItem ? (
                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between border-2 border-red-400 p-2 rounded-lg w-3/4">
                        {/* Decrease Quantity */}
                        <button
                          className="bg-red-500 hover:bg-red-500 text-white px-3 py-1 rounded-lg"
                          onClick={() =>
                            updateQty(product.id, Math.max(cartItem.qty - 1, 1))
                          }
                        >
                          -
                        </button>

                        {/* Quantity Display */}
                        <span className="text-white font-semibold">
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
                      <button
                        className="bg-gray-500 hover:bg-gray-600 text-white px-3 py-2 rounded-lg ml-2"
                        onClick={() => removeFromCart(product.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ) : (
                    <button
                      className="w-full bg-highlight-bg-icon  hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-300"
                      onClick={() => addToCart(product)}
                      disabled={!product.is_available}
                    >
                      Add to Cart
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>

      <aside
        className={`fixed bottom-14 left-0  w-full md:w-1/3 lg:w-1/3 bg-gray-800 p-6 transition-all duration-300 md:relative md:h-screen md:overflow-auto flex flex-col z-20 ${
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
        <h2 className="hidden mt-10 md:block text-xl  font-bold text-white  mb-4">
          # Orders
        </h2>

        {/* Order Items (Show only when expanded) */}
        <div
          className={`mt-4 space-y-4 min-h-[200px] custom-scrollbar transition-all duration-300 ${
            showCart ? "overflow-y-auto flex-1" : "hidden"
          }`}
        >
          {cart.length > 0 ? (
            cart.map((item) => (
              <div
                key={item.id}
                className="flex justify-between items-center bg-gray-700 p-2 rounded"
              >
                <div>
                  <h3 className="text-sm font-semibold">{item.name}</h3>
                  <p className="text-xs text-gray-400">
                    ${item.price.toFixed(2)} x {item.qty}
                  </p>
                </div>
                <div className="flex items-center">
                  {/* Quantity Input */}
                  <input
                    type="number"
                    min="1"
                    value={item.qty}
                    onChange={(e) => updateQty(item.id, Number(e.target.value))}
                    className="w-12 text-center bg-gray-600 text-white p-1 rounded"
                  />
                  {/* Delete Button */}
                  <button
                    className="ml-2 text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <Trash />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-400">Your cart is empty.</p>
          )}
        </div>

        {/* Payment Options */}
        {showCart && cart.length > 0 && (
          <div className="mt-4 p-3  rounded-lg">
            <h3 className="text-white text-sm font-semibold mb-2">
              Payment Method
            </h3>
            <div className="flex flex-wrap gap-2">
              {[
                { id: "cash", label: "Cash" },
                { id: "upi", label: "UPI" },
                { id: "paypal", label: "PayPal" },
              ].map((method) => (
                <label
                  key={method.id}
                  className="flex items-center gap-2 text-white text-sm bg-gray-600 px-3 py-2 rounded-lg cursor-pointer"
                >
                  <input type="radio" name="payment" id={method.id} />
                  {method.label}
                </label>
              ))}
            </div>
          </div>
        )}

        {/* Checkout Section (Only when expanded & items in cart) */}
        {showCart && cart.length > 0 && (
          <div className="mt-4 border-t border-gray-700 pt-4">
            <p className="text-lg font-semibold text-white">
              Subtotal: ${subtotal}
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

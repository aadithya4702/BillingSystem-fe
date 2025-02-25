import { React, useState } from "react";
import { Search, Trash, ChevronDown, ChevronUp } from "lucide-react";
import Sidebar from "../components/Sidebar";

const Order = () => {
  const [isExpanded, setIsExpanded] = useState(false); // Toggle state
  const products = [
    {
      id: 1,
      name: "Spicy seasoned seafood noodles",
      price: 2.29,
      available: 20,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 2,
      name: "Salted Pasta with mushroom sauce",
      price: 2.69,
      available: 11,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 3,
      name: "Beef dumpling in hot and sour soup",
      price: 2.99,
      available: 16,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 4,
      name: "Healthy noodle with spinach leaf",
      price: 3.29,
      available: 22,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 5,
      name: "Grilled chicken with veggies",
      price: 4.99,
      available: 15,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 6,
      name: "Classic cheeseburger",
      price: 3.99,
      available: 10,
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTatLiJAG6jse2XTu96VcidI8X5OYIvWzcenw&s",
    },
    {
      id: 7,
      name: "Margherita pizza",
      price: 5.49,
      available: 18,
      image: "margherita_pizza.jpg",
    },
    {
      id: 8,
      name: "Caesar salad with grilled shrimp",
      price: 6.79,
      available: 14,
      image: "caesar_salad.jpg",
    },
    {
      id: 9,
      name: "BBQ ribs with mashed potatoes",
      price: 7.99,
      available: 12,
      image: "bbq_ribs.jpg",
    },
    {
      id: 10,
      name: "Vegetable stir fry with tofu",
      price: 4.29,
      available: 20,
      image: "veggie_stirfry.jpg",
    },
    {
      id: 11,
      name: "Lemon garlic salmon",
      price: 8.49,
      available: 8,
      image: "salmon_garlic.jpg",
    },
    {
      id: 12,
      name: "Spaghetti carbonara",
      price: 5.99,
      available: 17,
      image: "carbonara.jpg",
    },
    {
      id: 13,
      name: "French onion soup",
      price: 3.49,
      available: 10,
      image: "onion_soup.jpg",
    },
    {
      id: 14,
      name: "Buffalo chicken wings",
      price: 6.29,
      available: 25,
      image: "buffalo_wings.jpg",
    },
    {
      id: 15,
      name: "Beef steak with peppercorn sauce",
      price: 9.99,
      available: 7,
      image: "beef_steak.jpg",
    },
    {
      id: 16,
      name: "Chocolate lava cake",
      price: 4.99,
      available: 9,
      image: "lava_cake.jpg",
    },
    {
      id: 17,
      name: "Mango sticky rice",
      price: 3.89,
      available: 16,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 18,
      name: "Thai green curry with chicken",
      price: 6.99,
      available: 11,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 19,
      name: "Japanese sushi platter",
      price: 12.99,
      available: 5,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 20,
      name: "Korean bibimbap",
      price: 7.49,
      available: 14,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 21,
      name: "Indian butter chicken",
      price: 8.79,
      available: 10,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 22,
      name: "Greek gyro wrap",
      price: 5.49,
      available: 13,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 23,
      name: "Turkish kebab platter",
      price: 9.59,
      available: 9,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 24,
      name: "Spanish paella with seafood",
      price: 11.99,
      available: 6,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
    {
      id: 25,
      name: "Russian beef stroganoff",
      price: 8.29,
      available: 12,
      image:
        "https://media.istockphoto.com/id/1084423556/photo/vegetarian-lentil-salad-with-fried-cheese-greens-and-fresh-vegeables.webp?s=2048x2048&w=is&k=20&c=DMyoDUM_t_ZY_uTDySkZNA1497m7YUlzPNZLUaOMIes=",
    },
  ];

  const [search, setSearch] = useState("");
  const [cart, setCart] = useState([]);
  const [showCart, setShowCart] = useState(true);

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
    .reduce((acc, item) => acc + item.price * item.qty, 0)
    .toFixed(2);

  return (
    <div className="flex flex-col md:flex-row h-screen bg-gray-900 text-white">
      {/* Main Content */}
      <main className="flex-1 pb-6 pl-6 pr-6 mb-10 overflow-auto">
        <div className="flex flex-col md:flex-row justify-between mb-4 bg-gray-900 p-4 sticky top-0 z-10">
          <h1 className="text-2xl font-bold">Choose Dishes</h1>
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

        <div className="grid grid-cols-1 relative sm:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 gap-6">
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
                <p className="text-sm text-gray-500 text-center">
                  {product.available} Bowls available
                </p>

                {/* Cart Controls */}
                <div className="mt-4">
                  {cartItem ? (
                    <div className="flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center justify-between border-2 border-red-400 p-2 rounded-lg w-3/4">
                        {/* Decrease Quantity */}
                        <button
                          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-lg"
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
                      className="w-full bg-red-500 hover:bg-red-600 text-white py-2 rounded-lg transition-colors duration-300"
                      onClick={() => addToCart(product)}
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
        className={`fixed bottom-12 left-0 w-full md:w-1/3 lg:w-1/4 bg-gray-800 p-4 transition-all duration-300 md:relative md:h-screen md:overflow-auto flex flex-col z-20 ${
          showCart ? "h-1/2 overflow-y-auto" : "h-[50px]"
        }`}
      >
        {/* Orders Header & Toggle Button */}
        {/* Title for Small Screens (Collapsible) */}
        <div
          className="flex justify-between items-center cursor-pointer md:hidden"
          onClick={() => setShowCart(!showCart)}
        >
          <h2 className="text-xl font-bold  text-white">Orders</h2>
          <button className="text-white">
            {showCart ? <ChevronDown /> : <ChevronUp />}
          </button>
        </div>

        {/* Title for Large Screens (Always Visible) */}
        <h2 className="hidden mt-10 md:block text-xl font-bold text-white  mb-4">
          # Orders
        </h2>

        {/* Order Items (Show only when expanded) */}
        <div
          className={`mt-4 space-y-4 min-h-[200px] transition-all duration-300 ${
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
            <button className="w-full mt-2 bg-red-500 hover:bg-red-600 p-2 rounded">
              Continue to Payment
            </button>
          </div>
        )}
      </aside>
    </div>
  );
};

export default Order;

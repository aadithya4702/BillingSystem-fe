import { React, useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBookBookmark,
  faIndianRupeeSign,
  faCalendarAlt,
  faInfoCircle,
  faCircleInfo,
} from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "../components/FilterComponent";
import axios from "axios";
import { getMostOrders, getRecentOrders } from "../api/Analytics";
import { generateBill } from "../api/Bill";
import { toast } from "react-toastify";
import { Directory, Encoding, Filesystem } from "@capacitor/filesystem";
import { Share } from "@capacitor/share";
import OrderPreviewModal from "../components/OrderPreviewModal";
import { fetchOrder } from "../api/Order";

const AnalyticSection = () => {
  // Get Formatted Date
  const getFormattedDate = () => {
    const date = new Date();
    const options = {
      weekday: "long",
      day: "numeric",
      month: "short",
      year: "numeric",
    };
    return date.toLocaleDateString("en-GB", options);
  };

  const [orderedItems, setorderedItems] = useState([]);
  const [recentOrders, setRecentOrders] = useState([]);
  const [cardItemsValue, setCardItemsValue] = useState([]);

  const [cardItems, setCardItems] = useState([
    {
      name: "Total Revenue",
      icon: faIndianRupeeSign,
      value: "0.00",
      change: "-32.40%",
      isNegative: true,
    },
    {
      name: "Total Dish Ordered",
      icon: faBookBookmark,
      value: "0",
      change: "+15.20%",
      isNegative: false,
    },
  ]);

  const [showPreview, setShowPreview] = useState(false);
  const [orderData, setOrderData] = useState({
    foodOrder: [],
    foodOrderItem: [],
  });

  const handlePreviewClick = async (orderId) => {
    try {
      const res = await fetchOrder(orderId);
      const data = res.data;

      if (data.success) {
        setOrderData({
          foodOrder: data.foodOrder,
          foodOrderItem: data.foodOrderItem,
        });
        setShowPreview(true);
      } else {
        console.error("Failed to fetch order");
      }
    } catch (err) {
      console.error("Error fetching order:", err);
    }
  };


  const [selectedFilter, setSelectedFilter] = useState("Today");
  const [selectedRecentOrderFilter, setselectedRecentOrderFilter] =
    useState("Today");

  const fetchOrderedItems = async (filter) => {
    try {
      const response = await getMostOrders(filter);
      setorderedItems(response.data); // Adjust if API wraps data in a key like `response.data.items`
    } catch (error) {
      console.error("Error fetching ordered items:", error);
    }
  };

  const fetchRecentOrders = async (filter) => {
    try {
      const response = await getRecentOrders(filter);
      const summary = response?.summary;

      if (summary) {
        // Update cardItems dynamically with value, change, and isNegative
        setCardItems((prevItems) =>
          prevItems.map((item) => {
            if (item.name === "Total Revenue") {
              const revenueChange = parseFloat(summary.revenue_change);
              return {
                ...item,
                value: parseFloat(summary.total_revenue).toLocaleString(
                  "en-IN",
                  {
                    minimumFractionDigits: 2,
                  }
                ),
                change: `${revenueChange > 0 ? "+" : ""}${revenueChange.toFixed(
                  2
                )}%`,
                isNegative: revenueChange < 0,
              };
            }

            if (item.name === "Total Dish Ordered") {
              const orderChange = parseFloat(summary.order_change);
              return {
                ...item,
                value: summary.total_orders.toString(),
                change: `${orderChange > 0 ? "+" : ""}${orderChange.toFixed(
                  2
                )}%`,
                isNegative: orderChange < 0,
              };
            }

            return item;
          })
        );
      }

      // Set recent orders as usual
      setRecentOrders(response.data);
    } catch (error) {
      console.error("Error fetching ordered items:", error);
    }
  };

  const handleFilterChange = (filterLabel) => {
    const filterValue = filterOptions[filterLabel];

    // Ignore 'Custom' for now
    if (filterValue === "custom") return;

    setSelectedFilter(filterValue);
    fetchOrderedItems(filterValue);
  };

  // Initial load with 'today' filter
  useEffect(() => {
    fetchOrderedItems("today");
    fetchRecentOrders("today");
  }, []);

  const handleRecentOrderFilterChange = (filterLable) => {
    const filterValue = filterOptions[filterLable];

    // Ignore 'Custom' for now
    if (filterValue === "custom") return;

    setselectedRecentOrderFilter(filterValue);
    fetchRecentOrders(filterValue);
  };

  const filterOptions = {
    Today: "today", // Not supported by API, can be handled later if needed
    Week: "this_week",
    Month: "this_month",
    Custom: "custom", // Ignored for now
  };

  return (
    <div className="p-4 h-screen max-h-screen overflow-auto mb-20 md:mb-5 bg-gray-900">
      {/* Header: Title & Filters */}
      <div className="flex flex-col sm:flex-row justify-between md:items-center mb-5 pb-2 border-b border-gray-600">
        <div className="mb-3 sm:mb-0">
          <h1 className="text-base sm:text-xl md:text-2xl font-semibold text-white">
            Dashboard
          </h1>
          <p className="text-xs sm:text-sm text-gray-400">
            {getFormattedDate()}
          </p>
        </div>
        {/* <FilterComponent
          onFilterChange={(filter) => console.log("Selected Filter:", filter)}
        /> */}
      </div>

      {/* Main Content */}
      <div className="flex flex-col lg:flex-row mb-20 md:mb-2 gap-4 md:gap-6">
        {/* Left Section */}
        <div className="w-full lg:w-3/4">
          {/* Cards */}
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 p-2 transition-all duration-200 ease-linear transform ">
            {cardItems.map((item, index) => (
              <div
                key={index}
                className="bg-[#1E1F29] hover:border-gradient p-4 md:p-6 rounded-lg shadow-lg border border-transparent transition-transform duration-300 ease-in-out transform  hover:shadow-2xl flex flex-col justify-between"
              >
                <div className="flex justify-between items-center">
                  <div className="bg-dash-back-color p-2 md:p-3 rounded-lg shadow-md">
                    <FontAwesomeIcon
                      icon={item.icon}
                      className="text-gradient-custom text-lg md:text-2xl text-blue-500"
                    />
                  </div>
                  <div className="flex gap-1 md:gap-2 items-center">
                    <p
                      className={`${
                        item.isNegative ? "text-red-400" : "text-green-400"
                      } font-semibold text-xs md:text-sm`}
                    >
                      {item.change}
                    </p>
                    <FontAwesomeIcon
                      icon={faArrowUp}
                      className={`text-xs md:text-sm rounded-full p-1 ${
                        item.isNegative
                          ? "text-red-400 bg-red-200 rotate-180"
                          : "text-green-400 bg-green-200"
                      }`}
                    />
                  </div>
                </div>
                <h3 className="text-xl md:text-3xl font-bold text-white mt-2 md:mt-4">
                  {item.name === "Total Revenue" ? "₹" : ""} {item.value}
                </h3>
                <h3 className="text-xs md:text-sm text-gray-400 mt-1 md:mt-2">
                  {item.name}
                </h3>
              </div>
            ))}
          </div>

          {/* Recent Orders Table */}
          <div className="bg-custom-dark-purple p-3 md:p-4 rounded-lg shadow-lg mt-4 md:mt-6  ">
            <div className="flex justify-between items-center pb-4">
              <div className="relative group inline-block">
                <h3 className="text-white text-sm lg:text-lg md:text-xl font-semibold mb-3 md:mb-4 flex items-center gap-1">
                  Recent Orders
                  <div className="relative flex items-center">
                    <FontAwesomeIcon
                      icon={faCircleInfo}
                      className="cursor-pointer"
                    />
                    {/* Tooltip */}
                    <div className="absolute bottom-full mb-1 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-gray-800 text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-10">
                      Click an order row to print
                    </div>
                  </div>
                </h3>
              </div>

              <FilterComponent
                onFilterChange={(filter) =>
                  handleRecentOrderFilterChange(filter)
                }
              />
            </div>
            <div className="max-h-60 md:max-h-80   overflow-y-auto custom-scrollbar">
              <table className="w-full text-white text-sm md:text-base">
                <thead className="sticky top-0  bg-custom-dark-purple text-xs md:text-sm z-10 border-b-2 border-gray-300 shadow-md">
                  <tr>
                    <th className="px-2 md:px-4 py-1 md:py-2 text-left">
                      Order Id
                    </th>
                    <th className="px-2 md:px-4 py-1 md:py-2 text-left">
                      Price
                    </th>
                    <th className="px-2 md:px-4 py-1 md:py-2 text-left">
                      Payment Method
                    </th>
                    <th className="px-2 md:px-4 py-1 md:py-2 text-left">
                      Status
                    </th>
                  </tr>
                </thead>

                <tbody className="overflow-y-auto">
                  {recentOrders.length > 0 ? (
                    recentOrders.map((order, index) => (
                      <tr
                        key={index}
                        onClick={() => handlePreviewClick(order.order_id)}
                        className="hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors duration-200 border-b border-gray-300 dark:border-gray-700 cursor-pointer"
                      >
                        <td className="px-2 md:px-4 py-4 font-medium text-gray-800 dark:text-gray-200">
                          {order.order_id}
                        </td>
                        <td className="px-2 md:px-4 py-4 text-gray-600 dark:text-gray-400">
                          ₹{order.total_amount}
                        </td>
                        <td className="px-2 md:px-4 py-4 text-gray-600 dark:text-gray-400 truncate max-w-xs">
                          {order.payment_type}
                        </td>
                        <td className="px-2 md:px-4 py-4 font-semibold text-green-500 dark:text-green-400">
                          {order.order_status}
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td
                        colSpan="4"
                        className="px-4 py-6 text-center text-gray-500 dark:text-gray-400"
                      >
                        No recent orders found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <OrderPreviewModal
          isOpen={showPreview}
          onClose={() => setShowPreview(false)}
          foodOrder={orderData.foodOrder}
          foodOrderItem={orderData.foodOrderItem}
        />

        {/* Right Section */}
        <div className="w-full  lg:w-2/5">
          <div className="bg-custom-dark-purple md:h-[90%] p-3 md:p-4 rounded-lg shadow-lg">
            <div className="flex justify-between border-b-2 pb-4 border-input-text-color items-center mb-3 md:mb-4">
              <h3 className="text-white text-sm lg:text-lg md:text-xl font-semibold">
                Most Ordered
              </h3>
              <FilterComponent
                onFilterChange={(filter) => handleFilterChange(filter)}
              />
            </div>
            <div className="h-[450px] overflow-y-auto custom-scrollbar">
              {orderedItems.length > 0 ? (
                orderedItems.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-3 md:gap-4 p-2"
                  >
                    <img
                      src={item.image_url}
                      alt={item.food_name}
                      className="w-12 h-12 rounded-full object-cover"
                    />
                    <div className="text-white">
                      <h4 className="text-xs md:text-sm">{item.food_name}</h4>
                      <p className="text-xs text-gray-400">
                        {item.total_quantity} dishes ordered
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-4 text-sm text-gray-400 text-center">
                  No records found.
                </div>
              )}
            </div>
            {/* <div className="text-center mt-3 md:mt-4">
              <button className="w-full py-2 bg-transparent border-2 border-orange-500 text-orange-500 font-semibold rounded-md text-xs md:text-sm">
                View All
              </button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticSection;

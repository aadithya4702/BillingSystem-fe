import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBookBookmark,
  faIndianRupeeSign,
  faCalendarAlt,
} from "@fortawesome/free-solid-svg-icons";
import FilterComponent from "../components/FilterComponent";

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

  const orderedItems = [
    {
      name: "Spicy Seasoned Seafood Noodles",
      quantity: 200,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Crispy Fried Chicken Wings",
      quantity: 150,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Grilled Lamb Chops",
      quantity: 120,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      quantity: 100,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Spicy Seasoned Seafood Noodles",
      quantity: 200,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Crispy Fried Chicken Wings",
      quantity: 150,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Grilled Lamb Chops",
      quantity: 120,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      quantity: 100,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Spicy Seasoned Seafood Noodles",
      quantity: 200,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Crispy Fried Chicken Wings",
      quantity: 150,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Grilled Lamb Chops",
      quantity: 120,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
    {
      name: "Vegetable Stir Fry",
      quantity: 100,
      imageUrl:
        "https://vps029.manageserver.in/test/wp-content/uploads/2023/12/Gochujang-Noodles-Recipe-SQ.jpg",
    },
  ];

  const cardItems = [
    {
      name: "Total Revenue",
      icon: faIndianRupeeSign,
      value: "10,240.00",
      change: "-32.40%",
      isNegative: true,
    },
    {
      name: "Total Dish Ordered",
      icon: faBookBookmark,
      value: "1,540",
      change: "+15.20%",
      isNegative: false,
    },
  ];

  const [selectedFilter, setSelectedFilter] = useState("Today");

  const filterOptions = ["Today", "Yesterday", "Week", "Month", "Custom"];

  return (
    <div className="p-4 max-h-screen overflow-auto mb-20 md:mb-5">
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
          <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-2 md:grid-cols-2 gap-4 p-2">
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
          <div className="bg-custom-dark-purple p-3 md:p-4 rounded-lg shadow-lg mt-4 md:mt-6 overflow-x-auto">
            <div className="flex justify-between items-center pb-4">
              <h3 className="text-white text-lg md:text-xl font-semibold mb-3 md:mb-4">
                Recent Orders
              </h3>
              <FilterComponent
                onFilterChange={(filter) =>
                  console.log("Selected Filter:", filter)
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
                  {[101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111].map(
                    (customer, index) => (
                      <tr key={index} className="hover:bg-gray-800 transition">
                        <td className="px-2 md:px-4 py-1 md:py-2">
                          {customer}
                        </td>
                        <td className="px-2 md:px-4 py-1 md:py-2">$12.99</td>
                        <td className="px-2 md:px-4 py-1 md:py-2">UPI</td>
                        <td className="px-2 md:px-4 py-1 md:py-2 text-green-400">
                          Delivered
                        </td>
                      </tr>
                    )
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="w-full lg:w-2/5">
          <div className="bg-custom-dark-purple md:h-[90%] p-3 md:p-4 rounded-lg shadow-lg">
            <div className="flex justify-between border-b-2 pb-4 border-input-text-color items-center mb-3 md:mb-4">
              <h3 className="text-white text-lg md:text-xl font-semibold">
                Most Ordered
              </h3>
              <FilterComponent
                onFilterChange={(filter) =>
                  console.log("Selected Filter:", filter)
                }
              />
            </div>
            <div className="h-[450px] overflow-y-auto custom-scrollbar">
              {orderedItems.map((item, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3 md:gap-4 p-2 "
                >
                  {/* <FontAwesomeIcon
                    icon={faBookBookmark}
                    className="text-white text-lg md:text-2xl"
                  /> */}
                  <img
                    src={item.imageUrl}
                    alt=""
                    className="w-12 h-12 rounded-full"
                  />
                  <div className="text-white">
                    <h4 className="text-xs md:text-sm">{item.name}</h4>
                    <p className="text-xs text-gray-400">
                      {item.quantity} dishes ordered
                    </p>
                  </div>
                </div>
              ))}
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

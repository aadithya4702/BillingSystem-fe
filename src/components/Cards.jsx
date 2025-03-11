import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBookBookmark,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const Cards = () => {
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

  return (
    <div className="flex flex-wrap md:flex-nowrap w-full gap-6 p-4">
      {cardItems.map((item, index) => (
        <div
          key={index}
          className="relative bg-[#1E1F29] w-full md:w-1/2 lg:w-1/3 p-6 rounded-xl shadow-lg 
      border border-transparent transition-all duration-300 ease-in-out transform hover:scale-105
      hover:shadow-2xl hover:border-gradient flex flex-col justify-between"
        >
          {/* Top Section: Icon & Percentage */}
          <div className="flex justify-between items-center">
            {/* Icon Box */}
            <div className="bg-dash-back-color flex items-center px-3 py-2 rounded-lg shadow-md">
              <FontAwesomeIcon
                icon={item.icon}
                className="text-gradient-custom text-2xl text-blue-500"
              />
            </div>

            {/* Percentage Change */}
            <div className="flex gap-2 items-center">
              <p
                className={`${
                  item.isNegative ? "text-red-400" : "text-green-400"
                } font-semibold text-sm`}
              >
                {item.change}
              </p>
              <FontAwesomeIcon
                icon={faArrowUp}
                className={`text-sm rounded-full p-1 ${
                  item.isNegative
                    ? "text-red-400 bg-[rgba(255,77,77,0.2)] rotate-180"
                    : "text-green-400 bg-[rgba(136,224,145,0.24)]"
                }`}
              />
            </div>
          </div>

          {/* Middle Section: Amount */}
          <div className="mt-6 flex items-baseline">
            <h3 className="text-3xl font-bold text-white flex items-center">
              {item.icon === faIndianRupeeSign && (
                <FontAwesomeIcon
                  icon={faIndianRupeeSign}
                  className="mr-2 text-lg"
                />
              )}
              {item.value}
            </h3>
          </div>

          {/* Bottom Section: Description */}
          <h3 className="text-sm text-gray-400 mt-2">{item.name}</h3>

          {/* Glow Effect */}
          <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-blue-500 to-purple-600 opacity-0 transition-opacity duration-300 hover:opacity-20"></div>
        </div>
      ))}
    </div>
  );
};

export default Cards;

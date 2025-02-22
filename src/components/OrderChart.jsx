import React from "react";
import Chart from "./Chart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBowlFood,
  faIndianRupeeSign,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

const OrderChart = () => {
  return (
    <div>
      <div className="bg-custom-dark-purple max-h-[350px] scrollbar-none w-full p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 max-w-sm mx-auto overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-white text-xl font-semibold">Most Ordered</h3>
          <div className="flex items-center gap-2">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              className="text-gradient-custom text-2xl text-blue-600"
            />
            <h3 className="text-white text-lg font-semibold">Option</h3>
          </div>
        </div>
        <Chart />
      </div>
    </div>
  );
};

export default OrderChart;

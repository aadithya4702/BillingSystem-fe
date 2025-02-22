import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faIndianRupeeSign,
} from "@fortawesome/free-solid-svg-icons";

const AnalyticsCard = () => {
  return (
    <div className=" lg:w-[400px]  md:max-w-xs p-4 bg-custom-dark-purple rounded-lg shadow-lg hover:shadow-xl transition duration-300 ease-in-out transform hover:scale-105">
      <div className="flex justify-between">
        <div className="bg-dash-back-color items-center flex px-2 rounded-md">
          <FontAwesomeIcon
            icon={faIndianRupeeSign}
            className="text-gradient-custom text-xl text-blue-600"
          />
        </div>
        <div className="flex gap-2 items-center">
          <p className="text-green-400 font-semibold">-32.40%</p>
          <p>
            <FontAwesomeIcon
              icon={faArrowUp}
              className="text-green-400 text-sm rounded-full p-1 bg-[rgba(136,224,145,0.24)]"
            />
          </p>
        </div>
      </div>
      <div className="flex items-baseline mt-4">
        <h3 className="lg:text-3xl md:text-xl sm:text-sm font-bold text-white">
          <FontAwesomeIcon icon={faIndianRupeeSign} className="mr-2 " />
          10,240.00
        </h3>
      </div>
      <h3 className="text-sm text-input-text-color mt-1">Total Revenue</h3>
    </div>
  );
};

export default AnalyticsCard;

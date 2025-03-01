import React from "react";
import OrderSection from "../pageSections/OrderSection";
import Sidebar from "../components/Sidebar";


const Order = () => {
  return (
    <div className="flex">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Dynamic content area */}
      <div className="flex-grow">
        <OrderSection />
      </div>
    </div>
  );
};

export default Order;

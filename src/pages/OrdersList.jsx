import React from "react";
import Sidebar from "../components/Sidebar";
import OrdersListSection from "../pageSections/OrdersListSection";

const OrdersList = () => {
  return (
    <div>
      <div className="flex">
        {/* Sidebar stays fixed */}
        <Sidebar />

        {/* Dynamic content area */}
        <div className="flex-grow h-screen">
          <OrdersListSection />
          {/* Renders the child routes (Order, AddDish, etc.) */}
        </div>
      </div>
    </div>
  );
};

export default OrdersList;

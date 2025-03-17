import React from "react";
import Sidebar from "../components/Sidebar";
import AnalyticSection from "../pageSections/AnalyticSection";

const Analytics = () => {
  return (
    <div className="flex max-h-screen">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Dynamic content area */}
      <div className="flex-grow">
        <AnalyticSection />
        {/* Renders the child routes (Order, AddDish, etc.) */}
      </div>
    </div>
  );
};

export default Analytics;

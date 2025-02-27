import React from "react";
import AddDishSection from "../pageSections/AddDishSection";
import Sidebar from "../components/Sidebar";

const AddDish = () => {
  return (
    <div>
      <div className="flex">
        {/* Sidebar stays fixed */}
        <Sidebar />

        {/* Dynamic content area */}
        <div className="flex-grow p-4">
          <AddDishSection />{" "}
          {/* Renders the child routes (Order, AddDish, etc.) */}
        </div>
      </div>
    </div>
  );
};

export default AddDish;

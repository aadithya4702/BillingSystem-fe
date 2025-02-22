import React from "react";
import AnalyticsCard from "./AnalyticsCard";

const Cards = () => {
  return (
    // <div>
    //   <div className="max-w-[75%] flex gap-4 mt-4">
    //     <AnalyticsCard />
    //     <AnalyticsCard />
    //     <AnalyticsCard />
    //   </div>
    // </div>

    <div>
      <div className="max-w-full  flex flex-wrap gap-4 ">
        <AnalyticsCard />
        <AnalyticsCard />
        <AnalyticsCard />
      </div>
    </div>
  );
};

export default Cards;

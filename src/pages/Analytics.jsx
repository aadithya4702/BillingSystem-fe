import React from "react";
import Sidebar from "../components/Sidebar";
import AnalyticSection from "../pageSections/AnalyticSection";

// const Analytics = () => {
//   return (
//     <div>
//       <div className=" flex ">
//         <div className="p-2 space-y-4 ">
//           <Title />
//           <Cards />
//           <OrderReport />
//         </div>

//         <div className="space-y-3">
//           <MostOrderedCard />
//           <OrderChart />
//         </div>
//       </div>
//     </div>
//   );
// };

const Analytics = () => {
  return (
    <div className="flex">
      {/* Sidebar stays fixed */}
      <Sidebar />

      {/* Dynamic content area */}
      <div className="flex-grow">
        <AnalyticSection />{" "}
        {/* Renders the child routes (Order, AddDish, etc.) */}
      </div>
    </div>
  );
};

export default Analytics;

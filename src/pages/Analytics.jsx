import React from "react";
import Title from "../components/Title";
import Cards from "../components/Cards";
import MostOrderedCard from "../components/MostOrderedCard";
import OrderChart from "../components/OrderChart";
import OrderReport from "../components/OrderReport";

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
    <div>
      <div className="flex p-4 flex-col lg:flex-row gap-4">
        <div className="p-2 space-y-4 w-full lg:w-3/4">
          <Title />
          <Cards />
          <OrderReport />
        </div>

        <div className="space-y-3 w-full lg:w-1/4">
          <MostOrderedCard />
          <OrderChart />
        </div>
      </div>
    </div>
  );
};

export default Analytics;

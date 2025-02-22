import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBowlFood,
  faIndianRupeeSign,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

const MostOrderedCard = () => {
  // Sample ordered items, you can replace this with dynamic data if needed
  const orderedItems = [
    { name: "Spicy Seasoned Seafood Noodles", quantity: 200 },
    { name: "Crispy Fried Chicken Wings", quantity: 150 },
    { name: "Grilled Lamb Chops", quantity: 120 },
    { name: "Vegetable Stir Fry", quantity: 100 },
  ];

  return (
    // <div className="bg-custom-dark-purple max-h-[400px] scrollbar-none w-full p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 max-w-sm mx-auto overflow-y-auto">
    //   {/* Card Header */}
    //   <div className="flex justify-between items-center mb-4">
    //     <h3 className="text-white text-xl font-semibold">Most Ordered</h3>
    //     <div className="flex items-center gap-2">
    //       <FontAwesomeIcon
    //         icon={faIndianRupeeSign}
    //         className="text-gradient-custom text-2xl text-blue-600"
    //       />
    //       <h3 className="text-white text-lg font-semibold">Option</h3>
    //     </div>
    //   </div>

    //   {/* Most Ordered Items List */}
    //   <div className="flex flex-col space-y-1 overflow-y-auto no-scrollbar max-h-[200px]">
    //     {orderedItems.map((item, index) => (
    //       <div key={index} className="flex items-center gap-4 p-4 rounded-md">
    //         <FontAwesomeIcon
    //           icon={faBowlFood}
    //           className="text-white text-3xl"
    //         />
    //         <div className="text-white">
    //           <h4 className="text-sm ">{item.name}</h4>
    //           <p className="text-xs font-thin text-input-text-color">
    //             {item.quantity} dishes ordered
    //           </p>
    //         </div>
    //       </div>
    //     ))}
    //   </div>

    //   {/* Button to View All */}
    //   <div className="text-center mt-4">
    //     <button className="w-full py-2 bg-transparent border border-2 border-custom-font-color-orange text-custom-font-color-orange font-semibold rounded-md">
    //       View All
    //     </button>
    //   </div>
    // </div>

    <div className="bg-custom-dark-purple  w-full sm:w-auto p-4 rounded-lg shadow-lg hover:shadow-2xl transition duration-300 ease-in-out transform hover:scale-105 overflow-y-auto">
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

      <div className="flex flex-col space-y-1 overflow-y-auto max-h-[250px]">
        {orderedItems.map((item, index) => (
          <div key={index} className="flex items-center gap-4 p-2 rounded-md">
            <FontAwesomeIcon
              icon={faIndianRupeeSign}
              className="text-white text-3xl"
            />
            <div className="text-white">
              <h4 className="text-sm">{item.name}</h4>
              <p className="text-xs font-thin text-input-text-color">
                {item.quantity} dishes ordered
              </p>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-4">
        <button className="w-full py-2 bg-transparent  border-2 border-custom-font-color-orange text-custom-font-color-orange font-semibold rounded-md">
          View All
        </button>
      </div>
    </div>
  );
};

export default MostOrderedCard;

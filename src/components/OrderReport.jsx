import { React, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBowlFood,
  faIndianRupeeSign,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";

const OrderReport = () => {
  const [data, setData] = useState([
    {
      customer: "John Doe",
      menu: "Pizza",
      price: "$12.99",
      status: "Delivered",
    },
    {
      customer: "Jane Smith",
      menu: "Burger",
      price: "$8.99",
      status: "Pending",
    },
    {
      customer: "Mark Johnson",
      menu: "Pasta",
      price: "$14.99",
      status: "In Progress",
    },
    {
      customer: "John Doe",
      menu: "Pizza",
      price: "$12.99",
      status: "Delivered",
    },
    {
      customer: "Jane Smith",
      menu: "Burger",
      price: "$8.99",
      status: "Pending",
    },
    {
      customer: "Mark Johnson",
      menu: "Pasta",
      price: "$14.99",
      status: "In Progress",
    },
    {
      customer: "John Doe",
      menu: "Pizza",
      price: "$12.99",
      status: "Delivered",
    },
    {
      customer: "Jane Smith",
      menu: "Burger",
      price: "$8.99",
      status: "Pending",
    },
    {
      customer: "Mark Johnson",
      menu: "Pasta",
      price: "$14.99",
      status: "In Progress",
    },
  ]);

  return (
    // <div className="overflow-hidden">
    //   <div className="bg-custom-dark-purple max-h-[500px] p-4 rounded-lg shadow-lg">
    //     {/* Title Section - This doesn't scroll */}
    //     <div className="flex justify-between items-center mb-4">
    //       <h3 className="text-white text-xl font-semibold">Most Ordered</h3>
    //       <div className="flex items-center gap-2">
    //         <FontAwesomeIcon
    //           icon={faIndianRupeeSign}
    //           className="text-gradient-custom text-2xl text-blue-600"
    //         />
    //         <h3 className="text-white text-lg font-semibold">Option</h3>
    //       </div>
    //     </div>

    //     {/* Table Section - This scrolls */}
    //     <div className="overflow-y-auto max-h-[350px] no-scrollbar">
    //       <table className="min-w-full table-auto ">
    //         <thead className="border-b border-input-text-color">
    //           <tr className="bg-transparent border-0  text-white">
    //             <th className="px-4 py-2 ">Customer</th>
    //             <th className="px-4 py-2 ">Menu</th>
    //             <th className="px-4 py-2 ">Price</th>
    //             <th className="px-4 py-2 ">Status</th>
    //           </tr>
    //         </thead>

    //         <tbody>
    //           {data.map((row, index) => (
    //             <tr
    //               key={index}
    //               className={`${
    //                 index % 2 === 0
    //                   ? "bg-transparent text-white border-b-0"
    //                   : "bg-transparent text-white border-b-0"
    //               } border-b`}
    //             >
    //               <td className="px-4 py-2 font-light text-input-text-color text-center">{row.customer}</td>
    //               <td className="px-4 py-2 font-light text-input-text-color text-center">{row.menu}</td>
    //               <td className="px-4 py-2 font-light text-input-text-color text-center">{row.price}</td>
    //               <td className="px-4 py-2 font-light text-input-text-color text-center">{row.status}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>
    //   </div>
    // </div>

    <div>
      <div className="bg-custom-dark-purple  p-4 rounded-lg shadow-lg">
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

        <div className="overflow-y-auto max-h-[350px] no-scrollbar">
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="border-b  border-input-text-color">
                <tr className="bg-transparent border-0 text-white">
                  <th className="px-4 py-2">Customer</th>
                  <th className="px-4 py-2">Menu</th>
                  <th className="px-4 py-2">Price</th>
                  <th className="px-4 py-2">Status</th>
                </tr>
              </thead>
              <tbody>
                {data.map((row, index) => (
                  <tr
                    key={index}
                    className="bg-transparent text-white border-b-0"
                  >
                    <td className="px-4 py-2 text-center">{row.customer}</td>
                    <td className="px-4 py-2 text-center">{row.menu}</td>
                    <td className="px-4 py-2 text-center">{row.price}</td>
                    <td className="px-4 py-2 text-center">{row.status}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderReport;

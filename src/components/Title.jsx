import React from "react";

// Function to get formatted date
const getFormattedDate = () => {
  const date = new Date();
  const options = {
    weekday: "long", // Full weekday name (e.g., 'Tuesday')
    day: "numeric", // Numeric day (e.g., '2')
    month: "short", // Abbreviated month (e.g., 'Feb')
    year: "numeric", // Full year (e.g., '2021')
  };

  // Format the date and return it
  return date.toLocaleDateString("en-GB", options);
};

const Title = () => {
  return (
    // <div>
    //   <div className="w-[75%] ">
    //     <h1 className="text-2xl text-white ">Dashboard</h1>
    //     <p className="text-md text-input-text-color mb-5">{`${getFormattedDate()}`}</p>
    //     <hr class="border-0 h-[1px] bg-input-text-color " />
    //   </div>
    // </div>

    <div>
      <div className="">
        <h1 className="text-md sm:text-xl text-white">Dashboard</h1>
        <p className="text-sm sm:text-md text-input-text-color mb-5">{`${getFormattedDate()}`}</p>
        <hr className="border-0 h-[1px] bg-input-text-color" />
      </div>
    </div>
  );
};

export default Title;

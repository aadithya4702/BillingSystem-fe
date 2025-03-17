import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowUp,
  faBookBookmark,
  faIndianRupeeSign,
  faCalendarAlt,
  faFilter,
} from "@fortawesome/free-solid-svg-icons";

const FilterComponent = ({ onFilterChange }) => {
  const filterOptions = [
    "Today",
    "Week",
    "Month",
    "Custom",
  ];
  const [selectedFilter, setSelectedFilter] = useState("Current Day");
  const [showDropdown, setShowDropdown] = useState(false);
  const [customDate, setCustomDate] = useState({ start: "", end: "" });

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    if (filter !== "Custom") {
      setShowDropdown(false);
      onFilterChange(filter);
    }
  };

  const handleCustomDateChange = () => {
    if (customDate.start && customDate.end) {
      onFilterChange({ start: customDate.start, end: customDate.end });
      setShowDropdown(false);
    }
  };

  const closeDropDownFilter = () => {
    setShowDropdown(false);
  };

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={() => setShowDropdown(!showDropdown)}
        className="flex justify-center items-center px-4 py-2 rounded-md text-sm font-semibold transition-all duration-300 
                  bg-transparent border-2 border-input-text-color text-white "
      >
        <FontAwesomeIcon icon={faFilter} className="mr-2 text-lg" />
        {selectedFilter}
      </button>

      {showDropdown && (
        <div className="absolute z-30 mt-2 right-2 w-52 bg-[#1E1F29] shadow-lg rounded-md border border-gray-700">
          {filterOptions.map((filter, index) => (
            <button
              key={index}
              onClick={() => handleFilterSelect(filter)}
              className={`block w-full px-4 py-2 text-sm text-left text-white hover:bg-gray-700 ${
                selectedFilter === filter ? "bg-gray-800" : ""
              }`}
            >
              {filter}
            </button>
          ))}

          {selectedFilter === "Custom" && (
            <div className="p-3 bg-gray-800  rounded-md">
              <label className="block text-sm text-gray-400">Start Date:</label>
              <input
                type="date"
                value={customDate.start}
                onChange={(e) =>
                  setCustomDate({ ...customDate, start: e.target.value })
                }
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white outline-none"
              />

              <label className="block text-sm text-gray-400 mt-2">
                End Date:
              </label>
              <input
                type="date"
                value={customDate.end}
                onChange={(e) =>
                  setCustomDate({ ...customDate, end: e.target.value })
                }
                className="w-full p-2 mt-1 rounded bg-gray-700 text-white outline-none"
              />

              <button
                onClick={handleCustomDateChange}
                className="mt-3 w-full py-2 bg-orange-500 text-white font-semibold rounded-md hover:bg-orange-600"
              >
                Apply
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FilterComponent;

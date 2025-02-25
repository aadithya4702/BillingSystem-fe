import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartBar,
  faEnvelope,
  faGear,
  faHouse,
  faHotel,
  faPercent,
  faBell,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [activeMenu, setActiveMenu] = useState("home");

  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const iconClasses = "text-xl";
  const activeIconColor = "text-white";

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden md:flex md:flex-col md:w-20 min-h-screen p-2  items-center justify-evenly bg-custom-dark-purple">
        <div className="bg-logo-outer-color  p-2 rounded-md">
          <FontAwesomeIcon
            icon={faHotel}
            className="text-gradient-custom w-8 h-8"
          />
        </div>

        {["home", "analytics", "offers", "logout"].map((menu, index) => (
          <div
            key={index}
            className={`${
              activeMenu === menu
                ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
                : ""
            } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
          >
            <NavLink to={`/${menu}`} onClick={() => handleMenuClick(menu)}>
              <FontAwesomeIcon
                icon={
                  menu === "home"
                    ? faHouse
                    : menu === "analytics"
                    ? faChartBar
                    : menu === "offers"
                    ? faPercent
                    : faArrowRightFromBracket
                }
                className={`${
                  activeMenu === menu ? activeIconColor : "text-gradient-custom"
                } ${iconClasses}`}
              />
            </NavLink>
          </div>
        ))}
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 z-10 right-0 bg-custom-dark-purple p-2 flex justify-around items-center md:hidden shadow-lg">
        {["home", "analytics", "offers", "logout"].map((menu, index) => (
          <NavLink
            key={index}
            to={`/${menu}`}
            className={`p-2 rounded-md transition-all duration-300 ${
              activeMenu === menu
                ? "bg-highlight-bg-icon text-white"
                : "text-gradient-custom"
            }`}
            onClick={() => handleMenuClick(menu)}
          >
            <FontAwesomeIcon
              icon={
                menu === "home"
                  ? faHouse
                  : menu === "analytics"
                  ? faChartBar
                  : menu === "offers"
                  ? faPercent
                  : faArrowRightFromBracket
              }
              className="text-lg"
            />
          </NavLink>
        ))}
      </div>
    </>
  );
};

export default Sidebar;

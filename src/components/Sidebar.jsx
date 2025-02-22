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
import { NavLink } from "react-router-dom"; // Import NavLink for navigation

const Sidebar = () => {
  // Track the selected menu item
  const [activeMenu, setActiveMenu] = useState("home");

  // A function to handle menu selection
  const handleMenuClick = (menu) => {
    setActiveMenu(menu);
  };

  const iconClasses = "text-xl"; // Default icon size
  const activeIconColor = "text-white"; // Color when active

  return (
    <div className="max-w-20 min-h-screen overflow-y-auto p-2 flex flex-col items-center justify-evenly bg-custom-dark-purple">
      {/* Logo */}
      <div className="bg-logo-outer-color p-2 rounded-md">
        <FontAwesomeIcon
          icon={faHotel}
          className="text-gradient-custom w-8 h-8"
        />
      </div>

      {/* Sidebar Items */}
      <div
        className={`${
          activeMenu === "home"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/home" onClick={() => handleMenuClick("home")}>
          <FontAwesomeIcon
            icon={faHouse}
            className={`${
              activeMenu === "home" ? activeIconColor : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "analytics"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/analytics" onClick={() => handleMenuClick("analytics")}>
          <FontAwesomeIcon
            icon={faChartBar}
            className={`${
              activeMenu === "analytics"
                ? activeIconColor
                : "text-gradient-custom "
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "offers"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/offers" onClick={() => handleMenuClick("offers")}>
          <FontAwesomeIcon
            icon={faPercent}
            className={`${
              activeMenu === "offers" ? activeIconColor : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "messages"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/messages" onClick={() => handleMenuClick("messages")}>
          <FontAwesomeIcon
            icon={faEnvelope}
            className={`${
              activeMenu === "messages"
                ? activeIconColor
                : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "notifications"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink
          to="/notifications"
          onClick={() => handleMenuClick("notifications")}
        >
          <FontAwesomeIcon
            icon={faBell}
            className={`${
              activeMenu === "notifications"
                ? activeIconColor
                : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "settings"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/settings" onClick={() => handleMenuClick("settings")}>
          <FontAwesomeIcon
            icon={faGear}
            className={`${
              activeMenu === "settings"
                ? activeIconColor
                : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>

      <div
        className={`${
          activeMenu === "logout"
            ? "shadow-highlight-icon bg-highlight-bg-icon text-white"
            : ""
        } w-full text-icon-color p-4 text-center cursor-pointer rounded-md transition-colors duration-200`}
      >
        <NavLink to="/logout" onClick={() => handleMenuClick("logout")}>
          <FontAwesomeIcon
            icon={faArrowRightFromBracket}
            className={`${
              activeMenu === "logout" ? activeIconColor : "text-gradient-custom"
            } ${iconClasses}`}
          />
        </NavLink>
      </div>
    </div>
  );
};

export default Sidebar;

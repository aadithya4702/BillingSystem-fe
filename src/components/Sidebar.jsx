import { React, useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartBar,
  faReceipt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { logout } from "../api/Signin";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname; // Get the current route

  const menuItems = [
    { name: "home", icon: faReceipt },
    { name: "analytics", icon: faChartBar },
    { name: "dish", icon: faSquarePlus },
    { name: "logout", icon: faArrowRightFromBracket },
  ];
  const { logout } = useContext(UserContext);
  const logoutUser = async () => {
    const response = await logout();
    if (response?.status === 200) {
      logout();
      toast.success("Logged out successfully!", {
        position: "top-right",
      });
    }
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden md:flex md:flex-col md:w-20  p-2 items-center justify-evenly bg-custom-dark-purple">
        <div className="bg-logo-outer-color p-2 rounded-md">
          <FontAwesomeIcon
            icon={faReceipt}
            className="text-gradient-custom w-8 h-8"
          />
        </div>

        {menuItems.map(({ name, icon }, index) =>
          name != "logout" ? (
            <NavLink
              key={index}
              to={`/${name}`}
              className={`w-full p-4 text-center cursor-pointer rounded-md transition-colors duration-200 
              ${
                currentPath === `/${name}`
                  ? "bg-highlight-bg-icon text-white"
                  : "text-icon-color"
              }`}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`text-xl ${
                  currentPath === `/${name}`
                    ? "text-white"
                    : "text-gradient-custom"
                }`}
              />
            </NavLink>
          ) : (
            <div
              key={index}
              onClick={logoutUser}
              className={`w-full p-4 text-center cursor-pointer rounded-md transition-colors duration-200 
              ${
                currentPath === `/${name}`
                  ? "bg-highlight-bg-icon text-white"
                  : "text-icon-color"
              }`}
            >
              <FontAwesomeIcon
                icon={icon}
                className={`text-xl ${
                  currentPath === `/${name}`
                    ? "text-white"
                    : "text-gradient-custom"
                }`}
              />
            </div>
          )
        )}
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 z-10 right-0 bg-custom-dark-purple p-2 flex justify-around items-center md:hidden shadow-lg">
        {menuItems.map(({ name, icon }, index) =>
          name != "logout" ? (
            <NavLink
              key={index}
              to={`/${name}`}
              className={`p-2 rounded-md transition-all duration-300 
              ${
                currentPath === `/${name}`
                  ? "bg-highlight-bg-icon text-white"
                  : "text-icon-color"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="text-lg" />
            </NavLink>
          ) : (
            <div
              key={index}
              onClick={logoutUser}
              className={`p-2 rounded-md transition-all duration-300 
              ${
                currentPath === `/${name}`
                  ? "bg-highlight-bg-icon text-white"
                  : "text-custom-font-color-orange"
              }`}
            >
              <FontAwesomeIcon icon={icon} className="text-lg" />
            </div>
          )
        )}
      </div>
    </>
  );
};

export default Sidebar;

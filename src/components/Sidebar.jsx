import React, { useContext, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightFromBracket,
  faChartPie,
  faReceipt,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import { NavLink, useLocation } from "react-router-dom";
import { logoutCall } from "../api/Signin";
import { toast } from "react-toastify";
import { UserContext } from "../context/UserContext";
import logo from "../assets/d2_logo.png";

const Sidebar = () => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { name: "home", icon: faReceipt },
    { name: "analytics", icon: faChartPie },
    { name: "dish", icon: faSquarePlus },
    { name: "logout", icon: faArrowRightFromBracket },
  ];

  const { logout } = useContext(UserContext);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const logoutUser = async () => {
    setShowLogoutModal(true); // Open modal on button click
  };

  const confirmLogout = async () => {
    const response = await logoutCall();
    if (response?.status === 200) {
      logout();
      toast.success("Logged out successfully!", { position: "top-right" });
    }
    setShowLogoutModal(false); // Close modal after logging out
  };

  return (
    <>
      {/* Sidebar for large screens */}
      <div className="hidden md:flex md:flex-col h-screen left-0 md:w-20 min-w-20 items-center justify-evenly bg-custom-dark-purple py-4">
        {menuItems.map(({ name, icon }, index) => {
          const isActive = currentPath === `/${name}`;

          if (name !== "logout") {
            return isActive ? (
              <div
                key={index}
                className="w-full bg-gray-900 mx-2 h-16 rounded-l-xl flex items-center justify-center shadow-md 
               transition-transform transform-gpu duration-300 ease-in-out"
              >
                <NavLink
                  to={`/${name}`}
                  className="w-full h-full flex items-center justify-center cursor-pointer"
                >
                  <div
                    className="bg-highlight-bg-icon w-10 h-10 flex items-center justify-center rounded-lg shadow-inner 
                      transition-transform duration-300 ease-in-out transform hover:scale-105"
                  >
                    <FontAwesomeIcon
                      icon={icon}
                      className="text-xl text-white"
                    />
                  </div>
                </NavLink>
              </div>
            ) : (
              <NavLink
                key={index}
                to={`/${name}`}
                className="w-full mx-2 h-16 flex items-center justify-center cursor-pointer 
               transition-all duration-300 hover:bg-gray-700 rounded-l-xl"
              >
                <FontAwesomeIcon
                  icon={icon}
                  className="text-xl text-custom-font-color-orange transition-transform duration-300 transform hover:scale-105"
                />
              </NavLink>
            );
          } else {
            return (
              <div
                key={index}
                onClick={logoutUser}
                className={`w-full mx-2 h-16 flex items-center justify-center cursor-pointer rounded-l-xl transition-colors duration-300 ${
                  isActive
                    ? "bg-highlight-bg-icon text-white"
                    : "text-custom-font-color-orange hover:bg-gray-700"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="text-xl" />
              </div>
            );
          }
        })}
      </div>

      {/* Bottom Navbar for small screens */}
      <div className="fixed bottom-0 left-0 z-10 right-0 bg-custom-dark-purple p-2 flex justify-around items-center md:hidden shadow-lg">
        {menuItems.map(({ name, icon }, index) => {
          const isActive = currentPath === `/${name}`;

          if (name !== "logout") {
            return (
              <NavLink
                key={index}
                to={`/${name}`}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-highlight-bg-icon text-white"
                    : "text-icon-color"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="text-lg" />
              </NavLink>
            );
          } else {
            return (
              <div
                key={index}
                onClick={logoutUser}
                className={`p-2 rounded-md transition-all duration-300 ${
                  isActive
                    ? "bg-highlight-bg-icon text-white"
                    : "text-custom-font-color-orange"
                }`}
              >
                <FontAwesomeIcon icon={icon} className="text-lg" />
              </div>
            );
          }
        })}
      </div>

      {showLogoutModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold text-input-text-color">
              Are you sure you want to logout?
            </h2>
            <div className="flex justify-center mt-4">
              <button
                onClick={() => setShowLogoutModal(false)}
                className="px-4 py-2 bg-gray-300 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={confirmLogout}
                className="px-4 py-2 bg-highlight-bg-icon text-white rounded"
              >
                Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Sidebar;

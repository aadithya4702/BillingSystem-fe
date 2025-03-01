import React from "react";
import NotFoundLogo from "../assets/20602754_6333072.svg";

const NotFound = () => {
  return (
    <div>
      <div className="h-screen flex flex-col justify-center items-center">
        <img className="w-3/4 h-1/2" src={NotFoundLogo} alt="404 Not Found" />
        <h3 className="text-xl font-bold text-input-text-color">404 | Not Found</h3>
      </div>
    </div>
  );
};

export default NotFound;

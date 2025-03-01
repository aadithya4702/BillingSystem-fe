import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const truckData = localStorage.getItem("dsquare_valid_truck");

    if (truckData) {
      // ✅ If logged in, redirect to home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return children; // If not logged in, allow access
};

export default AuthGuard;

import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AuthGuard = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const truckData = localStorage.getItem("dsquare_valid_truck");
    const token = localStorage.getItem("dsquare_token");

    if (truckData && token) {
      // ✅ If logged in, redirect to home
      navigate("/home", { replace: true });
    }
  }, [navigate]);

  return children; // If not logged in, allow access
};

export default AuthGuard;

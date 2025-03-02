import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { registerUser, loginUser, getTruckDetails } from "../api/Signin";
import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [signup, setSignup] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  // 🚀 Use useEffect to navigate after login success
  useEffect(() => {
    if (isLoggedIn) {
      window.location.href = "/home";
    }
  }, [isLoggedIn, navigate]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, c_password } = user;

    if (signup) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long!");
        return;
      }

      if (password !== c_password) {
        toast.error("Passwords do not match!");
        return;
      }

      try {
        const response = await registerUser({
          name,
          email,
          password,
          c_password,
        });

        if (response?.status === 200) {
          toast.success("Registration successful!");
          setSignup(false);
        }
      } catch (error) {
        console.error("Signup error:", error);
        toast.error("Signup failed. Please try again.");
      }
    } else {
      try {
        const loginResponse = await loginUser({ email, password });

        if (loginResponse?.status === 200) {
          localStorage.setItem(
            "dsquare_token",
            loginResponse.data.token.accessToken
          );
          toast.success("Login Successful!");

          try {
            const truckResponse = await getTruckDetails();
            if (truckResponse?.status === 200) {
              localStorage.setItem(
                "dsquare_valid_truck",
                JSON.stringify(truckResponse.data.data[0])
              );
            }
          } catch (error) {
            console.error("Error fetching truck details:", error);
          }

          // ✅ Ensure state updates before navigating
          setIsLoggedIn(true); // Delay to ensure state update
        } else {
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        console.error("Login error:", error);
        toast.error("Login failed. Please try again.");
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="items-center pt-10 md:w-[540px] min-h-[445px] flex flex-col gap-2 bg-custom-dark-purple shadow-custom p-5 rounded-3xl">
        <h3 className="text-3xl text-white">
          {signup ? "Create an Account" : "Sign In"}
        </h3>
        <p className="text-white text-xs mb-4">
          {signup ? "Have an Account? " : "Don't have an account? "}
          <label
            className="text-custom-font-color-orange cursor-pointer"
            onClick={() => setSignup(!signup)}
          >
            {signup ? "Sign in" : "Sign up"}
          </label>
        </p>

        <form
          onSubmit={handleSubmit}
          className="gap-2 flex flex-col w-full px-5"
        >
          {signup && (
            <div className="relative mb-3 inputfield">
              <p className="text-xs font-light mb-1 text-white">Username</p>
              <input
                type="text"
                name="name"
                placeholder="Enter user name"
                value={user.name}
                required
                onChange={handleInputChange}
                className="input w-full bg-transparent border p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
              />
            </div>
          )}
          <div className="relative mb-3 inputfield">
            <p className="text-xs font-light mb-1 text-white">Email</p>
            <input
              type="email"
              name="email"
              value={user.email}
              placeholder="Enter email address"
              required
              onChange={handleInputChange}
              className="input w-full bg-transparent border p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
            />
          </div>
          <div className="relative mb-3 inputfield">
            <p className="text-xs font-light mb-1 text-white">Password</p>
            <input
              type="password"
              name="password"
              placeholder={signup ? "Create password" : "Enter password"}
              value={user.password}
              required
              onChange={handleInputChange}
              className="input w-full bg-transparent border p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
            />
          </div>

          {signup && (
            <div className="relative mb-3 inputfield">
              <p className="text-xs font-light mb-1 text-white">
                Confirm Password
              </p>
              <input
                type="password"
                name="c_password"
                placeholder="Confirm password"
                value={user.c_password}
                required
                onChange={handleInputChange}
                className="input w-full bg-transparent border p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
              />
            </div>
          )}

          <button
            className="px-6 py-2 text-sm rounded shadow h-[38px] bg-custom-font-color-orange text-white"
            type="submit"
          >
            {signup ? "Create Account" : "Sign In"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Signin;

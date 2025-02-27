import React, { useState } from "react";
import { toast } from "react-toastify";
import { registerUser, loginUser } from "../api/Signin";

const Signin = () => {
  const [signup, setSignup] = useState(false);
  const [forgetPassword, setForgetPassword] = useState(false);
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    c_password: "",
  });

  const clearUserData = () => {
    setUser({ name: "", email: "", password: "", c_password: "" });
  };

  const toggleSignup = () => {
    setSignup(!signup);
    clearUserData();
  };

  const forgetPasswordShow = () => {
    setForgetPassword(!forgetPassword);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, c_password } = user;

    if (signup) {
      if (password.length < 8) {
        toast.error("Password must be at least 8 characters long!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      if (password !== c_password) {
        toast.error("Passwords do not match!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        return;
      }

      const response = await registerUser({
        name,
        email,
        password,
        c_password,
      });
      if (response?.status === 200) {
        toast.success("Registration successful!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        toggleSignup(); // Switch to login after signup
      }
    } else {
      const response = await loginUser({ email, password });
      if (response?.status === 200) {
        localStorage.setItem("dsquare_token", response.data.token.accessToken);
        toast.success("Welcome Back!", {
          position: toast.POSITION.TOP_RIGHT,
        });
        // navigate("/home"); // Uncomment if using navigation
      }
    }
  };

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="items-center pt-10 lg:w-[540px] lg:min-h-[445px] sm:w-[540px] sm:min-h-[445px] flex flex-col gap-2 bg-custom-dark-purple shadow-custom p-5 rounded-3xl">
        <h3 className="text-3xl text-white">
          {signup ? "Create an Account" : "Sign In"}
        </h3>
        <p className="text-white text-xs mb-4">
          {signup ? "Have an Account? " : "Don't have an account? "}
          <label
            className="text-custom-font-color-orange hover:cursor-pointer"
            onClick={toggleSignup}
          >
            {signup ? "Sign in" : "Sign up"}
          </label>
        </p>

        <form
          onSubmit={handleSubmit}
          className="gap-2 flex flex-col w-full pr-5 pl-5"
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
                className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
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
              className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
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
              className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
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
                className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
              />
            </div>
          )}

          {!signup && (
            <div className="relative mb-2 flex">
              <input type="checkbox" />
              <span className="ml-3 text-white text-xs font-light">
                Keep me signed in
              </span>
            </div>
          )}

          <button
            className="px-6 py-2 text-sm rounded shadow h-[38px] bg-custom-font-color-orange hover:bg-rose-200 text-white"
            type="submit"
          >
            {signup ? "Create Account" : "Sign In"}
          </button>
        </form>

        {!signup && (
          <p
            className="text-custom-font-color-orange text-xs font-light flex justify-center mt-2 hover:cursor-pointer"
            onClick={forgetPasswordShow}
          >
            Forget your password?
          </p>
        )}

        {signup && (
          <div className="flex flex-col items-center gap-1 mt-2">
            <p className="text-white text-xs font-lighter">
              By creating an account, you agree to our
            </p>
            <p className="text-xs font-lighter text-custom-font-color-orange">
              Terms of Service
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Signin;

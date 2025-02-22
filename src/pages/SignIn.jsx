import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimesCircle } from "@fortawesome/free-solid-svg-icons";

Axios.defaults.baseURL = "https://backend-exu9.onrender.com/api";
Axios.defaults.withCredentials = true;

const Signin = () => {
  const [signup, setSignup] = useState(false);
  const [otpverifyshow, setotpverifyshow] = useState(false);
  const [otpFields, setOtpFields] = useState(["", "", "", "", "", ""]);
  const [forgetPassword, setForgetPassword] = useState(false);
  // const navigate = useNavigate();
  const [user, setUser] = useState({
    name: "",
    mobile: "",
    password: "",
  });

  const clearUserData = () => {
    setUser({
      name: "",
      mobile: "",
      password: "",
    });
    setOtpFields(["", "", "", "", "", ""]);
  };

  const forgetPasswordShow = () => {
    setForgetPassword(!true);
  };

  //otp
  const handleChange = (index, value) => {
    const newOtpFields = [...otpFields];
    newOtpFields[index] = value;

    if (value !== "" && index < otpFields.length - 1) {
      // Move to the next input field
      document.getElementById(`otp_val_${index + 1}`).focus();
    }

    setOtpFields(newOtpFields);
  };

  const handleBackspace = (index, e) => {
    if (e.key === "Backspace" && index >= 0) {
      // Clear the value in the current input field
      const newOtpFields = [...otpFields];
      newOtpFields[index] = "";

      // Move to the previous input field
      if (index > 0) {
        document.getElementById(`otp_val_${index - 1}`).focus();
      }

      setOtpFields(newOtpFields);
    }
  };

  //otp validation
  const handleotpvalidation = async () => {
    try {
      const { name, mobile, password } = user;
      const otp = otpFields.join("");
      const response = await Axios.post("/users/otpvalidation", {
        otp: otp,
        mobile,
        name,
        password,
      });

      if (response.status === 200) {
        toast.success("E-Mail verified", {
          position: toast.POSITION.TOP_RIGHT,
        });
        clearUserData(); // Clear user data after successful verification
        setSignup(!signup);
        setotpverifyshow(!otpverifyshow);
      } else {
        const errorMessage = response.data.message || "Unknown error occurred";
        toast.error(errorMessage, {
          position: toast.POSITION.TOP_RIGHT,
        });
      }
    } catch (error) {
      console.error("Error during OTP validation:", error);
      const errorMessage =
        error.response?.data.message || "Unknown error occurred";
      toast.error(errorMessage, {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };
  const toggleSignup = () => {
    setSignup(!signup);
    clearUserData();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, mobile, password } = user;

    if (signup) {
      if (password.length < 8) {
        toast.error("Provide a strong password!", {
          position: toast.POSITION.TOP_RIGHT,
        });
      } else {
        try {
          // Make an Axios POST request to your sign-up API endpoint
          const response = await Axios.post("/users/", {
            name,
            mobile,
            password,
          });

          // Check the response status and display a success or error toast
          if (response.status === 200) {
            toast.success("OTP has sent to the mail!", {
              position: toast.POSITION.TOP_RIGHT,
            });

            setotpverifyshow(!otpverifyshow);
          } else {
            toast.error("Registration failed", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } catch (error) {
          // Check if the error is an Axios error with a response
          if (error.response) {
            const { status, data } = error.response;

            if (status === 409) {
              // User already exists
              toast.error(data.message, {
                position: toast.POSITION.TOP_RIGHT,
              });
            } else {
              // Other status codes, display a generic error message
              toast.error("Registration failed", {
                position: toast.POSITION.TOP_RIGHT,
              });
            }
          } else {
            // Network error or other issues
            toast.error("Error during registration", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        }
      }
    } else {
      try {
        const { mobile, password } = user;
        const response = await Axios.post("/users/login", {
          mobile,
          password,
        });

        if (response.status === 200) {
          // Successful login, handle the token or redirect
          const token = response.data.token;
          // You can save the token in local storage or a cookie for future requests
          if (token) {
            localStorage.setItem("token", token);
          }
          // console.log("Logged in successfully, token:", token);
          toast.success("Welcome Back User:)", {
            position: toast.POSITION.TOP_RIGHT,
          });

          // navigate("/home");
        } else {
          const errorMessage = response.data.message; // Access the error message
          toast.error(errorMessage, {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      } catch (error) {
        // Check if the error is an Axios error with a response
        if (error.response) {
          const { status, data } = error.response;

          if (status === 401 || status === 404) {
            // Handle specific response status codes
            const errorMessage = data.message;
            toast.error(errorMessage, {
              position: toast.POSITION.TOP_RIGHT,
            });
          } else {
            // Other status codes, display a generic error message
            toast.error("Error during login", {
              position: toast.POSITION.TOP_RIGHT,
            });
          }
        } else {
          // Network error or other issues
          console.error("Error during login:", error);
          toast.error("Error during login", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
      }
    }
  };

  return (
    <div className="h-screen  flex items-center justify-center flex-col">
      {otpverifyshow ? (
        <div className="items-center pt-10 lg:w-[540px] lg:min-h-[445px] sm:w-[540px] sm:min-h-[445px] flex flex-col gap-2 bg-custom-dark-purple shadow-custom p-5 rounded-3xl">
          <h3 className="text-3xl text-white  ">
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
          {!signup ? (
            <>
              {" "}
              <form
                action=""
                onSubmit={handleSubmit}
                className="gap-2 flex flex-col w-full pr-5 pl-5"
              >
                <div className="relative mb-3 inputfield">
                  <p className="text-xs font-light mb-1 text-white">
                    Mobile number
                  </p>
                  <input
                    type="tel"
                    name="mobile"
                    pattern="\d{10}"
                    maxLength={10}
                    value={user.mobile}
                    placeholder="Enter Mobile number"
                    required
                    onChange={handleInputChange}
                    className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
                  />
                </div>
                <div className="relative mb-2 inputfield">
                  <p className="text-xs font-light mb-1 text-white">Password</p>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter password"
                    value={user.password}
                    required
                    onChange={handleInputChange}
                    className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
                  />
                </div>
                <div className="relative mb-2 flex">
                  <input type="checkbox" className="" name="" id="" />
                  <span className="ml-3 text-white text-xs font-light ">
                    Keep me signed in
                  </span>
                </div>
                <button
                  className="px-6 py-2 text-sm rounded shadow h-[38px] bg-custom-font-color-orange hover:bg-rose-200  text-white"
                  type="submit"
                  role="button"
                >
                  Sign In
                </button>
              </form>
              <p
                className="text-custom-font-color-orange text-xs font-light flex justify-center mt-2 hover:cursor-pointer"
                onClick={forgetPasswordShow}
              >
                Forget your password?
              </p>
            </>
          ) : (
            <>
              <form
                action=""
                className="gap-2 flex flex-col w-full pr-5 pl-5"
                onSubmit={handleSubmit}
              >
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
                <div className="relative mb-3 inputfield">
                  <p className="text-xs font-light mb-1 text-white">
                    Mobile number
                  </p>
                  <input
                    type="tel"
                    pattern="\d{10}"
                    maxLength={10}
                    name="mobile"
                    value={user.mobile}
                    placeholder="Enter Mobile number"
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
                    placeholder="Create password"
                    value={user.password}
                    required
                    onChange={handleInputChange}
                    className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
                  />
                </div>
                <button
                  className="px-6 py-2 text-sm rounded shadow h-[38px] bg-custom-font-color-orange hover:bg-rose-200  text-white"
                  type="submit"
                  role="button"
                >
                  Create Account
                </button>
              </form>
              <div className=" flex flex-col items-center gap-1 mt-2">
                <p className="text-white text-xs font-lighter">
                  By creating account, you agree to our
                </p>
                <p className="text-xs font-lighter text-custom-font-color-orange">
                  Terms of Service
                </p>
              </div>
            </>
          )}
        </div>
      ) : (
        <div className="  flex flex-col gap-6 bg-custom-dark-purple shadow-lg p-5 rounded-2xl">
          <div
            className="flex justify-end hover:text-custom-font-color-orange"
            onClick={() => setotpverifyshow(!otpverifyshow)}
          >
            <FontAwesomeIcon icon={faTimesCircle} className="text-white" />
          </div>
          <h3 className="text-white">Enter the OTP:</h3>
          <div className="flex space-x-2">
            {otpFields.map((value, index) => (
              <input
                key={index}
                type="text"
                id={`otp_val_${index}`}
                className="w-10 h-10 text-center bg-transparent border border-1 text-sm rounded-[4px] text-input-text-color"
                maxLength={1}
                min="0"
                max="9"
                value={value}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleBackspace(index, e)}
              />
            ))}
          </div>
          <button
            className="px-6 py-2 text-sm rounded shadow bg-custom-font-color-orange h-[38px] hover:bg-rose-200 text-white"
            onClick={handleotpvalidation}
          >
            Verify Code
          </button>
          <hr />
          <p className="text-white text-xs mb-4">
            Not received verification code ?
            <label
              className="text-custom-font-color-orange pl-1 hover:cursor-pointer"
              onClick={toggleSignup}
            >
              Resend code
            </label>
          </p>
        </div>
      )}
    </div>
  );
};

export default Signin;

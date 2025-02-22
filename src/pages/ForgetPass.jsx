import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ForgetPass = () => {
  // const navigate = useNavigate();
  const [passwordResetData, setpasswordResetData] = useState({
    mobile: "",
    newPass: "",
    conPass: "",
  });

  const clearUserData = () => {
    setpasswordResetData({
      mobile: "",
      newPass: "",
      conPass: "",
    });
  };

  const checkPasswords = (e) => {
    if (passwordResetData.newPass != passwordResetData.conPass) {
      setpasswordResetData({
        ...passwordResetData,
        conPass: "",
      });
      toast.error("Password and Confirm password not same", {
        position: toast.POSITION.TOP_RIGHT,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setpasswordResetData({ ...passwordResetData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { mobile, newPass, conPass } = passwordResetData;

    if (newPass.length < 8 && newPass != conPass) {
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
  };
  return (
    <div className="h-screen  flex items-center justify-center flex-col">
      <div className="items-center pt-10 lg:w-[540px] lg:h-[445px] sm:w-[540px] sm:h-[445px] flex flex-col gap-2 bg-custom-dark-purple shadow-custom p-5 rounded-3xl">
        <h3 className="text-3xl text-white  ">Password Reset</h3>
        <p className="text-xs text-input-text-color font-light">
          We Will Help You Reset your Password
        </p>
        <form
          action=""
          className="gap-2 flex flex-col w-full pr-5 pl-5"
          onSubmit={handleSubmit}
        >
          <div className="relative mb-3 inputfield">
            <p className="text-xs font-light mb-1 text-white">Mobile number</p>
            <input
              type="tel"
              pattern="\d{10}"
              maxLength={10}
              name="mobile"
              value={passwordResetData.mobile}
              placeholder="Enter Mobile number"
              required
              onChange={handleInputChange}
              className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
            />
          </div>

          <div className="relative mb-3 inputfield">
            <p className="text-xs font-light mb-1 text-white">
              Create Password
            </p>
            <input
              type="password"
              name="newPass"
              placeholder="Create password"
              value={passwordResetData.newPass}
              required
              onChange={handleInputChange}
              className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
            />
          </div>
          <div className="relative mb-3 inputfield">
            <p className="text-xs font-light mb-1 text-white">
              Confirm Password
            </p>
            <input
              type="password"
              name="conPass"
              placeholder="Confirm password"
              value={passwordResetData.conPass}
              required
              onChange={handleInputChange}
              onBlur={checkPasswords}
              className="input w-full bg-transparent border border-1 p-2 h-[38px] text-sm rounded-[4px] text-input-text-color"
            />
          </div>
          <button
            className="px-6 py-2 text-sm rounded shadow h-[38px] bg-custom-font-color-orange hover:bg-rose-200  text-white"
            type="submit"
            role="button"
          >
            Update Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgetPass;

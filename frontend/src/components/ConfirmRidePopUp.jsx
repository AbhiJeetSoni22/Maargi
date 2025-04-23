import PropTypes from "prop-types";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ConfirmRidePopUp = (props) => {
  const navigate = useNavigate();
  const [OTP, setOTP] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const SubmitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/start-ride`, {
        params: {
          rideId: props.ride._id,
          otp: OTP,
        },
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (response.status === 200) {
        props.setConfirmRidePopUpPanel(false);
        props.setridePopUpPanel(false);
        navigate("/captain-riding", {
          state: { ride: response.data },
        });
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // Display the "Invalid OTP" error message
        setErrorMessage("Invalid OTP. Please try again.");
        // Clear the message after 1.5 seconds
        setTimeout(() => setErrorMessage(""), 1500);
      } else {
        setErrorMessage("Invalid OTP. Please try again.");
        console.error("Error starting ride:", error);
      }
    }
  };

  return (
    <div className="md:ml-8 md:mt-[-10%] top-0 z-50 relative h-screen ">
      <h5
        className="absolute  left-[44%] top-[-5%] z-50 md:hidden"
        onClick={() => {
          props.setConfirmRidePopUpPanel(false);
        }}
      >
        <i className="text-4xl text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-xl  mt-10 font-semibold md:text-3xl mb-3">
        Confirm this ride to Start
      </h2>
      <div className="flex items-center justify-between bg-yellow-300 rounded-lg">
        <div className="flex my-2 items-center gap-4">
          <img
            className="h-12 md:h-16 ml-2 md:w-16 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU"
            alt=""
          />
          <h2 className="text-lg md:text-2xl font-medium">
            {props.ride?.user.fullName.firstName}
          </h2>
        </div>
        <h4 className="text-gray-600 text-lg font-medium md:text-xl mr-2">
          2.2 Km
        </h4>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col">
        <div className="w-full">
          <div className="flex items-center gap-5 p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
              <p className="text-sm md:text-lg text-gray-600">
                {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t-2 border-b-2 p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">562/11-A</h3>
              <p className="text-sm md:text-lg text-gray-600">
                {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-wallet-fill"></i>
            <div>
              <h3 className="text-lg md:text-2xl font-medium">Cash</h3>
              <p className="text-sm md:text-lg text-gray-600">
                ₹{props.ride?.fare}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-6 w-full items-center">
          <form onSubmit={(e) => SubmitHandler(e)}>
            <input
              type="text"
              className="w-full md:w-full mb-4 text-sm font-mono px-6 py-2 md:py-4 border bg-[#e7e7e7] rounded-lg focus:ring focus:ring-gray-700 focus:outline-none"
              value={OTP}
              required
              onChange={(e) => {
                setOTP(e.target.value);
              }}
              placeholder="Enter OTP"
            />
            {errorMessage && (
              <p className="text-red-500 text-sm text-center mb-2">
                {errorMessage}
              </p>
            )}
            <button className="w-2/3 ml-[15%] md:ml-[13%] text-sm mt-1 flex justify-center md:p-3 md:text-xl md:font-medium bg-green-500 text-white font-semibold p-2 rounded-lg">
              Confirm
            </button>
          
          </form>
        </div>
      </div>
    </div>
  );
};

ConfirmRidePopUp.propTypes = {
  ride: PropTypes.object,
  setConfirmRidePopUpPanel: PropTypes.func,
  setridePopUpPanel: PropTypes.func,
};

export default ConfirmRidePopUp;

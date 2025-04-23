import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";
import Navbar from "./Navbar";

const CaptainSignup = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFristName] = useState("");
  const [lastName, setLastName] = useState("");
  const [vehicleColor, setVehicleColor] = useState("");
  const [vehiclePlate, setVehiclePlate] = useState("");
  const [vehicleCapacity, setVehicleCapacity] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Error message state
  const [loading, setLoading] = useState(false); // Loading state

  // eslint-disable-next-line no-unused-vars
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading state to true

    const newCaptain = {
      fullName: {
        firstName: firstName,
        lastName: lastName,
      },
      email: email,
      password: password,
      vehicle: {
        color: vehicleColor,
        plate: vehiclePlate,
        capacity: vehicleCapacity,
        vehicleType: vehicleType,
      },
    };

    try {
      const url = import.meta.env.VITE_BASE_URL;
      const response = await axios.post(`${url}/captains/register`, newCaptain);

      if (response.status === 201) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(newCaptain);
        navigate("/captain-dashboard");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("This email is already registered. Please use another email.");
      } else {
        setErrorMessage("Failed to create an account. Please try again.");
      }
      setTimeout(() => setErrorMessage(""), 3000); // Clear the error after 3 seconds
    } finally {
      setLoading(false); // Reset loading state
    }

    // Reset form fields
    setEmail("");
    setPassword("");
    setFristName("");
    setLastName("");
    setVehicleColor("");
    setVehiclePlate("");
    setVehicleCapacity("");
    setVehicleType("");
  };

  return (
    <>
      <Navbar />
      <div className="flex flex-col justify-between items-center px-5 py-5">
        <div className="mb-5">
          <form
            action=""
            className="md:mt-20 mt-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="md:text-3xl text-2xl font-bold text-center mb-2 md:mb-6">
              Create Captain Account
            </h1>
            <h3 className="text-sm font-medium mb-2">What&apos;s your name</h3>
            <div className="flex gap-4 mb-2 md:mb-5">
              <input
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-2"
                type="text"
                value={firstName}
                onChange={(e) => {
                  setFristName(e.target.value);
                }}
                placeholder="First Name"
                required
              />
              <input
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-2"
                type="text"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                }}
                placeholder="Last Name (Optional)"
              />
            </div>
            <h3 className="text-sm font-medium mb-2">What&apos;s your email</h3>
            <input
              className="bg-[#eeeeee] px-4 border w-full rounded text-base placeholder:text-sm py-2 md:mb-5 mb-3"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="gmail@example.com"
              required
            />
            <h3 className="text-sm font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] px-4 border w-full rounded text-base placeholder:text-sm py-2 mb-2 md:mb-5"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              required
            />
            <h3 className="text-lg font-medium mb-2 md:mb-5">Vehicle Information</h3>
            <div className="flex gap-4 mb-2 md:mb-5">
              <input
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-1 md:py-2"
                type="text"
                value={vehicleColor}
                onChange={(e) => {
                  setVehicleColor(e.target.value);
                }}
                placeholder="Vehicle Color"
                required
              />
              <input
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-1 md:py-2"
                type="text"
                value={vehiclePlate}
                onChange={(e) => {
                  setVehiclePlate(e.target.value);
                }}
                placeholder="Vehicle Plate"
                required
              />
            </div>
            <div className="flex gap-4 mb-2 md:mb-5">
              <input
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-1 md:py-2"
                type="number"
                value={vehicleCapacity}
                onChange={(e) => {
                  setVehicleCapacity(e.target.value);
                }}
                placeholder="Vehicle Capacity"
                required
              />
              <select
                className="bg-[#eeeeee] px-4 border w-1/2 rounded text-base placeholder:text-sm py-1 md:py-2"
                value={vehicleType}
                onChange={(e) => {
                  setVehicleType(e.target.value);
                }}
                required
              >
                <option value="" disabled>
                  Select Vehicle Type
                </option>
                <option value="car">Car</option>
                <option value="auto">Auto</option>
                <option value="bike">Bike</option>
              </select>
            </div>
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              className={`w-full bg-[#111] text-gray-200 font-semibold my-2 rounded px-4 py-3 ${
                loading ? "opacity-70 cursor-not-allowed" : "hover:bg-[#292929]"
              }`}
              disabled={loading}
            >
              {loading ? "Creating Account..." : "Create Account"}
            </button>
          </form>
          <p className="text-center">
            Already have an Account?
            <Link to="/captain-login" className="text-blue-600 text-base pl-2">
              Login here
            </Link>
          </p>
        </div>
        <div className="relative">
          <p className="text-[10px] leading-tight">
            This site is protected by reCAPTCHA and the Google{" "}
            <u>Privacy Policy</u> and <u>Terms</u> of Service apply.
          </p>
        </div>
      </div>
    </>
  );
};

export default CaptainSignup;

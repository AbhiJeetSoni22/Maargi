import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { CaptainDataContext } from "../context/CaptainContext";
import axios from "axios";


const CaptainLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for button loading
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const { captain, setCaptain } = useContext(CaptainDataContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const capData = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/captains/login`,
        capData
      );

      if (response.status === 200) {
        const data = response.data;
        localStorage.setItem("token", data.token);
        setCaptain(data.captain);
        navigate("/captain-dashboard");
      }
    } catch (error) {
      // Show error message if login fails
      if (error.response && error.response.status === 401) {
        setErrorMessage("Invalid email or password. Please try again.");
      } else {
        setErrorMessage("An error occurred. Please try again later.");
      }
      setTimeout(() => setErrorMessage(""), 1200); // Clear error message after 1.2 seconds
    } finally {
      setLoading(false); // Set loading to false after request is complete
    }

    setEmail("");
    setPassword("");
  };

  return (
    <>
     
      <div className="flex flex-col justify-center items-center p-7">
        <div className="mb-5">
          <form
            action=""
            className="md:mt-20 mt-2"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="text-3xl font-bold text-center mb-6">Captain Login</h1>
            <h3 className="text-lg font-medium mb-2">What&apos;s your email</h3>
            <input
              className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              placeholder="gmail@example.com"
              required
            />
            <h3 className="text-lg font-medium mb-2">Enter Password</h3>
            <input
              className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              placeholder="password"
              required
            />
            {errorMessage && (
              <p className="text-red-500 text-sm mb-4">{errorMessage}</p>
            )}
            <button
              type="submit"
              className={`w-full bg-[#111111dd] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#292929] ${
                loading ? "cursor-not-allowed opacity-70" : ""
              }`}
              disabled={loading} // Disable button if loading
            >
              {loading ? "Logging in..." : "Login"}
            </button>
            <button
              type="button"
              className="w-full bg-[#10b461] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#17cd72]"
              onClick={() => {
                setEmail("bike@gmail.com");
                setPassword("12345");
              }}
            >
              Use Demo Credentials
            </button>
          </form>
          <p className="text-center">
            Want to Join as a Captain?
            <Link to="/captain-signup" className="text-blue-600 text-base pl-2">
              Sign Up
            </Link>
          </p>
          <div className="relative mt-10">
            <Link
              to="/login"
              className="w-full bg-[#ee8719] flex justify-center items-center text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#c57621]"
            >
              Sign in as a User
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default CaptainLogin;

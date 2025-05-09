import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import axios from "axios";
import { UserDataContext } from "../context/UserContext";


const UserLogin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // State for error message
  const [loading, setLoading] = useState(false); // State for button loading

  // eslint-disable-next-line no-unused-vars
  const { user, setUser } = useContext(UserDataContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true); // Set loading to true
    const userData = {
      email: email,
      password: password,
    };

    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${url}/users/login`, userData);
      if (response.status === 200) {
        setUser(response.data.user);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard");
      }
    } catch {
      // Show error message if login fails
      setErrorMessage("Wrong email or password");
      setTimeout(() => {
        setErrorMessage(""); // Hide error message after 2 seconds
      }, 1200);
    } finally {
      setLoading(false); // Set loading to false
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
            className="md:mt-20 mt-4"
            onSubmit={(e) => {
              handleSubmit(e);
            }}
          >
            <h1 className="text-3xl font-bold text-center mb-4 md:mb-6">User Login</h1>
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
              className="w-full bg-[#ee8719] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#c57621]"
              onClick={() => {
                setEmail("user@gmail.com");
                setPassword("12345");
              }}
            >
              Use Demo Credentials
            </button>
          </form>
          <p className="text-center">
            Don&apos;t have an Account?
            <Link to="/signup" className="text-blue-600 text-base pl-2">
              Sign Up
            </Link>
          </p>
          <div className="relative mt-10">
            <Link
              to="/captain-login"
              className="w-full bg-[#10b461] flex justify-center items-center text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#17cd72]"
            >
              Sign in as a Saarthi
            </Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserLogin;

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

const ForgetPassword = () => {
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    const url = import.meta.env.VITE_BASE_URL;
    try {
      const response = await axios.post(`${url}/users/forgetPassword`, { 
        email,
        newPassword 
      });
      
      if (response.status === 200) {
        setMessage("Password updated successfully!");
        setTimeout(() => {
          navigate("/login");
        }, 2000);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message || "An error occurred. Please try again.");
      setTimeout(() => {
        setErrorMessage("");
      }, 1200);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col justify-center items-center p-7">
      <div className="mb-5 w-full max-w-md">
        <form onSubmit={handleSubmit} className="md:mt-20 mt-4">
          <h1 className="text-3xl font-bold text-center mb-4 md:mb-6">Reset Password</h1>
          <p className="text-center text-gray-600 mb-6">
            Enter your email and new password to reset
          </p>
          
          {/* Email Field */}
          <h3 className="text-lg font-medium mb-2">Email Address</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="gmail@example.com"
            required
          />
          
          {/* New Password Field */}
          <h3 className="text-lg font-medium mb-2">New Password</h3>
          <input
            className="bg-[#eeeeee] px-4 border w-full rounded text-lg placeholder:text-base py-2 mb-5"
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            placeholder="Enter new password"
            required
            minLength="5"
          />
          
          {/* Messages */}
          {message && (
            <p className="text-green-500 text-sm mb-4 text-center">{message}</p>
          )}
          {errorMessage && (
            <p className="text-red-500 text-sm mb-4 text-center">{errorMessage}</p>
          )}
          
          {/* Submit Button */}
          <button
            type="submit"
            className={`w-full bg-[#111111dd] text-gray-200 font-semibold my-2 rounded px-4 py-3 hover:bg-[#292929] ${
              loading ? "cursor-not-allowed opacity-70" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Updating..." : "Reset Password"}
          </button>
        </form>
        
        {/* Back to Login Link */}
        <p className="text-center mt-4">
          Remember your password?{" "}
          <Link to="/login" className="text-blue-600 hover:underline">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default ForgetPassword;
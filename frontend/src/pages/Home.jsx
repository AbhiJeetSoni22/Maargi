import { Link } from "react-router-dom";
import { useEffect } from "react";

const Home = () => {
  const token = localStorage.getItem("token");
  useEffect(() => {
    if (token) {
      localStorage.removeItem("token");
    }
  }, [token]);

  return (
    <>
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-black to-gray-800 text-white py-20">
        <div className="container mx-auto px-6">
          <h1 className="md:text-5xl text-4xl  font-bold mb-4 animate-[slideDown_1s_ease-out] opacity-0 [animation-fill-mode:forwards]">
            Your Ride, Your Way
          </h1>
          <p className="text-xl mb-8 animate-[slideUp_1s_ease-out_0.5s] opacity-0 [animation-fill-mode:forwards]">
            Book rides instantly with Maargi - The smart way to travel
          </p>
          <Link
            to="/login"
            className="bg-yellow-400   border-yellow-400 border-4 hover:border-yellow-500 text-black px-8 py-3 rounded-lg font-bold  hover:bg-gray-900 hover:text-white transition-all duration-300"
          >
            Get Started
          </Link>
        </div>
      </div>
      {/* Discount Offer Section */}
      {/* Discount Offer Section */}
      <div className="bg-yellow-400 text-black py-8 md:py-6 lg:py-4">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-2xl md:text-xl lg:text-lg font-bold mb-4 animate-[fadeIn_1s_ease-out]">
            Special Offer Just for You!
          </h2>
          <p className="text-md md:text-sm lg:text-xs mb-4">
            Book 5 rides and get <span className="font-bold">20% OFF</span> on
            your 6th ride. Experience affordable and convenient travel like
            never before!
          </p>
          <Link
            to="/signup"
            className="bg-black text-white px-4 md:px-3 lg:px-2 py-2 md:py-1 lg:py-1 rounded-lg font-bold text-sm md:text-xs lg:text-xs hover:bg-gray-800 transition-all duration-300"
          >
            Sign Up Now
          </Link>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-gray-100">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">
            Why Choose Maargi?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Real-Time Tracking</h3>
              <p>
                Track your ride in real-time and share your journey with loved
                ones for added safety and convenience.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Affordable Rides</h3>
              <p>
                Enjoy competitive pricing with transparent fares and special
                discounts like 20% off on your 6th ride.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">
                Multiple Vehicle Options
              </h3>
              <p>
                Choose from a variety of vehicles including bikes, autos, and
                cars to suit your travel needs.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md transform transition-all duration-500 hover:scale-105 hover:shadow-xl">
              <h3 className="text-xl font-bold mb-4">Professional Drivers</h3>
              <p>
                Ride with verified and trained drivers who prioritize your
                safety and comfort.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center group">
              <div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
          animate-pulse group-hover:animate-bounce transition-all duration-300"
              >
                <span className="text-2xl font-bold text-black">1</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Enter Your Details</h3>
              <p className="text-gray-600">
                Provide your pickup and drop-off locations to find the best ride
                options.
              </p>
            </div>
            <div className="text-center group">
              <div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
          animate-pulse group-hover:animate-bounce transition-all duration-300"
              >
                <span className="text-2xl font-bold text-black">2</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Choose Your Ride</h3>
              <p className="text-gray-600">
                Select from a variety of vehicles like bikes, autos, or cars
                based on your needs.
              </p>
            </div>
            <div className="text-center group">
              <div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
          animate-pulse group-hover:animate-bounce transition-all duration-300"
              >
                <span className="text-2xl font-bold text-black">3</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Track Your Ride</h3>
              <p className="text-gray-600">
                Get real-time updates and track your driver’s location for a
                seamless experience.
              </p>
            </div>
            <div className="text-center group">
              <div
                className="bg-yellow-400 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 
          animate-pulse group-hover:animate-bounce transition-all duration-300"
              >
                <span className="text-2xl font-bold text-black">4</span>
              </div>
              <h3 className="font-bold text-lg mb-2">Enjoy Your Ride</h3>
              <p className="text-gray-600">
                Reach your destination safely and conveniently. Don’t forget to
                rate your ride!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-black text-white py-16">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-8 animate-[fadeIn_1s_ease-out]">
            Ready to Get Started?
          </h2>
          <div className="md:space-x-4 space-x-2">
            <Link
              to="/login"
              className="bg-yellow-400 text-black mb-3 px-6 md:px-8 py-3 rounded-lg font-bold hover:bg-yellow-500 
              transform hover:scale-110 transition-all duration-300 inline-block animate-pulse"
            >
              Book a Ride
            </Link>
            <Link
              to="/captain-login"
              className="bg-transparent border-2 border-yellow-400 text-yellow-400  px-6 md:px-8 py-3 rounded-lg font-bold 
              hover:bg-yellow-400 hover:text-black transform hover:scale-110 transition-all duration-300 inline-block"
            >
              Become a Driver
            </Link>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-8">
        <div className="container mx-auto px-6">
          <p className="text-center">
            &copy; 2025 Maargi. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

const style = document.createElement("style");
style.textContent = `
  @keyframes slideDown {
    from { transform: translateY(-50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes slideUp {
    from { transform: translateY(50px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
  }
  @keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
  }
`;
document.head.appendChild(style);

export default Home;

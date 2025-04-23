import { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { SocketContext } from '../context/SocketContext';
import LiveTracking from '../components/LiveTracking';
import Navbar from './Navbar';

const Riding = () => {
  const { socket } = useContext(SocketContext);
  const navigate = useNavigate();
  const location = useLocation();
  const ride = location.state?.ride;

  // State for modal visibility and payment status
  const [showPaymentModal, setShowPaymentModal] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    if (!socket) return;

    const handleRideEnded = () => {
      navigate('/dashboard');
    };

    socket.on('ride-ended', handleRideEnded);

    return () => {
      socket.off('ride-ended', handleRideEnded);
    };
  }, [socket, navigate]);

  const handlePayment = () => {
    setPaymentSuccess(true);
    setTimeout(() => {
      setShowPaymentModal(false);
      setPaymentSuccess(false);
    }, 2000); // Close modal and reset success status after 2 seconds
  };

  if (!socket) {
    return <div>Connecting...</div>;
  }

  return (
    <>
      {/* Navbar for large screens */}
      <div className="hidden md:block">
        <Navbar />
      </div>

      <div className="w-screen fixed px-2 flex md:hidden justify-between z-50 items-center top-4">
        <h1 className="text-xl font-bold z-50">Maargi</h1>

        <Link to="/dashboard" className="z-50">
          <i className="text-xl font-bold w-15 h-15 bg-orange-400 rounded-full p-2 ri-home-3-line"></i>
        </Link>
      </div>

      {/* Main Content */}
      <div className="flex flex-col-reverse lg:flex-row h-screen">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 px-3  bg-white flex flex-col items-center justify-center">
          <div className="w-full px-4 py-2">
            <div>
              {/* Vehicle Information */}
              <div className="flex items-center justify-between mb-0 md:mb-3">
               
                {ride?.vehicleType === 'car' && (
                  <img
                    className="h-20 md:h-24 mt-1"
                    src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                    alt="Car"
                  />
                )}
                {ride?.vehicleType === 'bike' && (
                  <img
                    className="h-16 md:h-20 mt-2"
                    src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                    alt="Bike"
                  />
                )}
                {ride?.vehicleType === 'auto' && (
                  <img
                    className="h-16 md:h-20 mt-2"
                    src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                    alt="Auto"
                  />
                )}
                <div className="text-right">
                  <h2 className="text-lg md:text-2xl font-medium">
                    {ride?.captain?.fullName?.firstName || 'No Captain'}
                  </h2>
                  <h3 className="text-sm font-semibold md:text-3xl">
                    {ride?.captain?.vehicle?.plate}
                  </h3>
                  <p className="text-sm md:text-lg text-gray-600">
                    {ride?.vehicleType || 'No vehicle'}
                  </p>
                </div>
              </div>

              {/* Ride Details */}
              <div className="flex gap-2 justify-between items-center md:mb-3 flex-col">
                <div className="w-full">
                  {/* Destination */}
                  <div className="flex items-center gap-5 p-3 border-t-gray-300 border-b-gray-300">
                    <i className="text-lg md:text-3xl ri-map-pin-user-fill"></i>
                    <div>
                      <h3 className="text-sm md:text-xl font-medium">
                        Destination
                        <p className="text-sm text-gray-700">
                          {ride?.destination || 'No Destination'}
                        </p>
                      </h3>
                    </div>
                  </div>
                  {/* Payment Info */}
                  <div className="flex items-center gap-5 border-t-2 p-3 border-t-gray-300 ">
                    <i className="text-xl md:text-3xl ri-wallet-fill"></i>
                    <div>
                      <h3 className="text-sm md:text-2xl font-medium">Cash</h3>
                      <p className="text-sm md:text-lg text-gray-600">
                        ₹{ride?.fare || '0'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Payment Button */}
              <button
                className="w-full md:ml-10 mt-0 md:mt-2 md:w-1/2 bg-green-600 text-white font-semibold p-2 rounded-lg"
                onClick={() => setShowPaymentModal(true)}
              >
                Make a Payment
              </button>
            </div>
          </div>
        </div>

        {/* Right Section - Map */}
        <div className="flex-1 bg-gray-100 relative z-10">
          <LiveTracking ride={ride} />
        </div>
      </div>

      {/* Payment Modal */}
      {showPaymentModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-80">
            <h2 className="text-xl font-semibold mb-4">Payment</h2>
            <p className="text-gray-600 mb-2">
              Payment Amount: <span className="font-bold">₹{ride?.fare || '0'}</span>
            </p>
            <p className="text-gray-600 mb-2">Enter your UPI ID:</p>
            <input
              type="text"
              placeholder="Enter your Dummy UPI ID"
              className="w-full p-2 mb-4 border rounded-md"
            />
            {paymentSuccess ? (
              <p className="text-green-600 font-semibold mb-4">
                Payment Successful!
              </p>
            ) : null}
            <div className="flex justify-end gap-2">
              <button
                className="bg-gray-500 text-white px-4 py-2 rounded-lg"
                onClick={() => setShowPaymentModal(false)}
              >
                Cancel
              </button>
              <button
                className="bg-green-600 text-white px-4 py-2 rounded-lg"
                onClick={handlePayment}
              >
                Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Riding;

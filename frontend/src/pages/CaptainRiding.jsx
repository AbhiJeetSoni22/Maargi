import { Link, useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState, useEffect } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LiveTracking from "../components/LiveTracking";
import captainImg from "../assets/captain.png";
import axios from "axios";

const CaptainRiding = () => {
  const location = useLocation();
  const ride = location.state?.ride;
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  const [tripDetails, setTripDetails] = useState({
    distance: '',
    time: ''
  });

  useEffect(() => {
    const getDistanceAndTime = async () => {
      try {
        if (ride?.pickup && ride?.destination) {
          const token = localStorage.getItem('token');
          if (!token) {
            console.error('No auth token found');
            return;
          }

          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/maps/get-destance-time`,
            {
              headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
              },
              params: {
                origin: ride.pickup,
                destination: ride.destination
              }
            }
          );
          
          if (response.status === 200) {
            setTripDetails({
              distance: response.data.distance,
              time: response.data.time
            });
          }
        }
      } catch (error) {
        console.error('Error fetching distance and time:', error.response?.data || error.message);
      
      }
    };

    getDistanceAndTime();
  }, [ride]);

  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        height: "0",
        transform: "translateY(1500%)",
      });
    }
  }, [finishRidePanel]);

  return (
    <>
      <div className="hidden md:block">
        <Navbar />
      </div>
      <div className="w-screen z-30 fixed px-2 flex md:hidden justify-between items-center top-4">
           <h1 className="text-xl flex  font-bold z-30">Maargi 
                     <img  className="w-8" src={captainImg} alt="" />
        
                  </h1>

        <Link to="/captain-dashboard" className="z-30">
          <i className="text-xl font-bold w-15 h-15 bg-orange-400 rounded-full p-2 ri-home-3-line"></i>
        </Link>
      </div>

      <div className="flex flex-col-reverse relative lg:flex-row h-screen overflow-hidden">
        {/* Left Section */}
        <div
          className="h-[20%] z-10  flex items-center relative justify-between md:h-[20%] md:ml-7 md:w-1/3 bg-yellow-300 p-4 md:mt-[10%]"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5 className="absolute w-[85%] top-0 left-[45%] md:hidden">
            <i className="text-3xl text-gray-600 ri-arrow-up-wide-line"></i>
          </h5>
          <div>
            <h1 className="text-xl font-semibold">{tripDetails.distance || '0 km'}</h1>
            <p className="text-sm text-gray-600">{tripDetails.time || '0 mins'}</p>
          </div>
          <button className="mt-1 md:px-10 px-4 py-2 md:py-4 text-lg md:w-1/2 md:p-3 md:text-2xl md:font-medium bg-green-500 text-white font-semibold rounded-lg">
            Complete Ride
          </button>
        </div>
          <div
            ref={finishRidePanelRef}
            className="fixed w-full z-40 lg:w-1/3 top-0 left-0 md:top-24 md:left-1 m-0 p-0 bg-white py-10 md:mb-24 translate-y-full"
          >
            <FinishRide ride={ride} setFinishRidePanel={setFinishRidePanel} />
          </div>

        {/* Right Section */}
        <div className="flex-1 z-0 h-[83%] md:w-2/3 md:mx-10 md:my-12 bg-gray-100">
          <LiveTracking ride={ride}/>
        </div>
      </div>
    </>
  );
};

export default CaptainRiding;

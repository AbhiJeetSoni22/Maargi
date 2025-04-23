import { useGSAP } from "@gsap/react";
import CaptainDetails from "../components/CaptainDetails";
import RidePopUp from "../components/RidePopUp";
import Navbar from "./Navbar";
import gsap from "gsap";
import { useRef, useState } from "react";
import ConfirmRidePopUp from "../components/ConfirmRidePopUp";
import { useNavigate} from "react-router-dom";
import { CaptainDataContext } from "../context/CaptainContext";
import { useEffect, useContext } from "react";
import { SocketContext } from "../context/SocketContext";
import axios from "axios";
import LiveTracking from "../components/LiveTracking";
import captainImg from "../assets/captain.png";
const CapDashboard = () => {
  const navigate = useNavigate();
  const [ridePopUpPanel, setridePopUpPanel] = useState(false);

  const [confirmRidePopUpPanel, setConfirmRidePopUpPanel] = useState(false);
  const [ride, setRide] = useState(null);
  const [accept, setAccept] = useState(false);
  const ridePopUpPanelRef = useRef(null);
  const confirmRidePopUpPanelRef = useRef(null);
  const user = "captain"
  const { captain } = useContext(CaptainDataContext);
  const { socket } = useContext(SocketContext);
  async function confirmRide() {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BASE_URL}/rides/confirm`,
        {
          rideId: ride._id,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );

      if (response.status === 200) {
        setridePopUpPanel(false);
        setConfirmRidePopUpPanel(true);
       
      }
    } catch (error) {
      console.error("Error confirming ride:", error);
    }
  }
  useEffect(() => {
    if (!socket || !captain?._id) return;


    // Clear any existing socket connection
    socket.disconnect();
    socket.connect();

    socket.emit("join", {
      userId: captain._id,
      userType: "captain"
    });

    const handleNewRide = (data) => {
  
      setRide(data);
      setridePopUpPanel(true);
    };

    socket.on("new-ride", handleNewRide);
    socket.on("connect", () => {

    });
    socket.on("connect_error", (error) => {
      console.error('Socket connection error:', error);
    });

    return () => {
      socket.off("new-ride", handleNewRide);
    };
  }, [socket, captain?._id]);

  useGSAP(() => {
    if (ridePopUpPanel) {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(ridePopUpPanelRef.current, {
        transform: "translateY(130%)",
      });
    }
  }, [ridePopUpPanel]);
  useGSAP(() => {
    if (confirmRidePopUpPanel) {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(0)",
      });
    } else {
      gsap.to(confirmRidePopUpPanelRef.current, {
        transform: "translateY(130%)",
      });
    }
  }, [confirmRidePopUpPanel]);

const handleHelp=()=>{
  const user = "captain"
  navigate('/help',{state: {user}})
}
const handleLogout = ()=>{
  localStorage.removeItem('token');
  navigate('/captain-login')
}
  return (
    <>
      <div className="hidden md:block">
        <Navbar user={user} />
      </div>
      {/* Conditionally render the Maargi sign and logout icon */}
      {!confirmRidePopUpPanel && (
        <div className="w-screen fixed px-2 flex md:hidden justify-between items-center top-4 z-30">
          <h1 className="text-xl md:text-3xl flex  font-bold z-30">
            Maargi
            <img className="w-6" src={captainImg} alt="" />
          </h1>
          <div>
            <button onClick={handleHelp} className="mr-2 z-20">
              <i className="text-xl md:text-3xl font-bold w-15 h-15 bg-green-400 rounded-full p-2  ri-question-line"></i>
            </button>
            <button onClick = {handleLogout} className="z-20">
              <i className="text-xl md:text-3xl  font-bold w-15 h-15 bg-yellow-400 rounded-full p-2  ri-logout-box-r-line"></i>
            </button>
          </div>
        </div>
      )}
      <div className="flex flex-col-reverse lg:flex-row h-screen relative">
        {/* Left Section */}
        <div className="w-full lg:w-1/3 z-20 md:p-6 p-4 bg-white flex flex-col items-center justify-center">
          <CaptainDetails
            setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
            accept={accept}
            ride={ride}
          />

          <div
            ref={ridePopUpPanelRef}
            className="fixed w-full translate-y-full lg:w-1/3 bottom-0 bg-white px-3 py-6 md:mb-24"
          >
            <RidePopUp
              setAccept={setAccept}
              accept={accept}
              confirmRide={confirmRide}
              ride={ride}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              setridePopUpPanel={setridePopUpPanel}
            />
          </div>
          <div
            ref={confirmRidePopUpPanelRef}
            className="fixed w-full z-30 md:h-[85%] h-screen translate-y-full lg:w-1/3 bottom-0 bg-white px-3 sm:py-8"
          >
            <ConfirmRidePopUp
              ride={ride}
              setConfirmRidePopUpPanel={setConfirmRidePopUpPanel}
              setridePopUpPanel={setridePopUpPanel}
            />
          </div>
        </div>

        {/* Right Section */}
        <div className="flex-1 z-0 md:mx-10 md:my-12 bg-gray-100 relative">
          <LiveTracking key="dashboardCaptain" />
        </div>
      </div>
    </>
  );
};

export default CapDashboard;

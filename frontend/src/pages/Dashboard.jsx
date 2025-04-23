import { useContext, useEffect, useRef, useState } from "react";
import Navbar from "./Navbar";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import LocationSearchPanle from "../components/LocationSearchPanle";
import "remixicon/fonts/remixicon.css";
import VehiclePanel from "../components/VehiclePanel";
import ConfirmRide from "../components/ConfirmRide";
import LookingForDriver from "../components/LookingForDriver";
import WaitingForDriver from "../components/WaitingForDriver";
import axios from "axios";
import { useNavigate} from "react-router-dom";
import { SocketContext } from "../context/SocketContext";
import { UserDataContext } from "../context/UserContext";
import LiveTracking from "../components/LiveTracking"

const Dashboard = () => {
  const navigate = useNavigate();
  const [pickupLocation, setPickupLocation] = useState("");
  const [dropoffLocation, setDropoffLocation] = useState("");
  const [vehiclePanel, setVehiclePanel] = useState(false);
  const [panelOpen, setPanelOpen] = useState(false);
  const [confirmRidePanel, setConfirmRidePanel] = useState(false);
  const [waitForDriver, setWaitForDriver] = useState(false);
  const [vehicleFound, setVehicleFound] = useState(false);
  const [activeField, setActiveField] = useState('pickup');
  const [checkfields , setCheckfields] = useState(false);
  const [vehicleType, setVehicleType] = useState(null);
  const [ride,setRide]= useState(null);
  const userType = "user"

  const [fare,setFare] = useState({});
  const { socket } =  useContext(SocketContext)
  const { user } = useContext(UserDataContext)
  useEffect(()=>{
   
    
  socket.emit('join',{userType:"user",userId:user._id})
},[user])
  const vehiclePanelRef = useRef(null);
  const panelRef = useRef(null);
  const confirmRidePanelRef = useRef(null);
  const vehicleFoundRef = useRef(null);
  const waitForDriverRef = useRef(null);

  const submitHandler = (e) => {
    e.preventDefault();
  };

  useGSAP(() => {
    if (panelOpen) {
      gsap.to(panelRef.current, {
        visibility: "visible",
        height: "22rem",
      });
    } else {
      gsap.to(panelRef.current, {
        visibility: "hidden",
        height: "0",
      });
    }
  }, [panelOpen]);

  useGSAP(() => {
    if (vehiclePanel) {
      gsap.to(vehiclePanelRef.current, {
        visibility: "visible",
        height: "20rem",
      });
    } else {
      gsap.to(vehiclePanelRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [vehiclePanel]);

  useGSAP(() => {
    if (confirmRidePanel) {
      gsap.to(confirmRidePanelRef.current, {
        visibility: "visible",
        height: "24rem",
      });
    } else {
      gsap.to(confirmRidePanelRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [confirmRidePanel]);
  useGSAP(() => {
    if (vehicleFound) {
      gsap.to(vehicleFoundRef.current, {
        visibility: "visible",
        height: "18rem",
      });
    } else {
      gsap.to(vehicleFoundRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [vehicleFound]);
  useGSAP(() => {
    if (waitForDriver) {
      gsap.to(waitForDriverRef.current, {
        visibility: "visible",
        height: "19rem",
      });
    } else {
      gsap.to(waitForDriverRef.current, {
        height: "0",
        visibility: "hidden",
      });
    }
  }, [waitForDriver]);

  useEffect(() => {
    if (!socket) return;

    // Join as user
    socket.emit('join', { userType: "user", userId: user._id });

    // Listen for ride confirmation
    const handleRideConfirmed = (confirmRide) => {
      setVehicleFound(false);
      setWaitForDriver(true);
      setRide(confirmRide);
    };

    socket.on('ride-confirmed', handleRideConfirmed);

    // Cleanup function
    return () => {
      socket.off('ride-confirmed', handleRideConfirmed);
    };
  }, [socket, user._id]);

  // Move ride-started event listener inside useEffect
  useEffect(() => {
    if (!socket) return;

    const handleRideStarted = (ride) => {
      setWaitForDriver(false);
      navigate('/riding', { state: { ride } });
    };

    socket.on('ride-started', handleRideStarted);

    return () => {
      socket.off('ride-started', handleRideStarted);
    };
  }, [socket, navigate]);

  const findTrip = async() => {
    setPanelOpen(false);
    setVehiclePanel(true);
    const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/rides/get-fare`,{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
      params: {
        pickup:pickupLocation,
       destination: dropoffLocation,
      },
    })
    setFare(response.data.fare);
  }
  const createRide = async ()=>{
   await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/create`,{
      pickup:pickupLocation,
      destination: dropoffLocation,
      vehicleType:vehicleType,
    },{
      headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    });
  }

  const handleHelp = () => {

    navigate('/help',{state:{userType}})
  }
 const handleLogout = ()=>{
    localStorage.removeItem('token');
    navigate('/login')
 }
  return (
    <>
      <div className="hidden md:block">
        <Navbar user={userType} />
      </div>
      <div className="w-screen fixed z-20 px-2 flex md:hidden justify-between items-center top-0 pt-4">
        <h1 className="text-2xl   font-bold z-20">Maargi</h1>
        <div>
       
        <button onClick={handleHelp} className="mr-2 z-20">
          <i className="text-xl font-bold w-15 h-15 bg-green-400 rounded-full p-2 ri-question-line"></i>
        </button>
        <button onClick = {handleLogout} className="z-20">
          <i className="text-xl font-bold w-15 h-15 bg-yellow-400 rounded-full p-2 ri-logout-box-r-line"></i>
        </button>

        </div>
      </div>
      <div className="flex flex-col-reverse lg:flex-row h-screen overflow-hidden">
  {/* Left Panel */}
  <div
    className={`w-full flex flex-col lg:w-1/3 sm:mb-4 bg-white relative p-4 lg:p-6 ${
      panelOpen ? "lg:sticky lg:top-0 lg:h-full" : ""
    }`}
  >
    {/* Form Section */}
    {!waitForDriver && !vehicleFound && !confirmRidePanel && !vehiclePanel && (
      <div className="w-full md:mt-[20%] max-w-md mx-auto">
        <form onSubmit={submitHandler}>
          <h1 className="text-xl md:text-2xl font-semibold mb-4">Get a ride</h1>
          {/* Inputs */}
          <div className="mb-4 relative">
          <div className="line absolute md:h-20 h-16 w-1 top-[117%] -translate-y-1/2 left-5 bg-gray-700 rounded-full"></div>
            <input
              type="text"
              value={pickupLocation}
              placeholder="Pickup location"
              required
              className="w-full text-sm md:text-lg py-2 px-8 md:py-3 border bg-gray-200 rounded-lg focus:ring focus:ring-gray-700 focus:outline-none"
              onChange={(e) => setPickupLocation(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("pickup");
              }}
            />
          </div>
          <div className="mb-4">
            <input
              type="text"
              value={dropoffLocation}
              required
              placeholder="Dropoff location"
              className="w-full text-sm md:text-lg py-2 px-8 md:py-3 border bg-gray-200 rounded-lg focus:ring focus:ring-gray-700 focus:outline-none"
              onChange={(e) => setDropoffLocation(e.target.value)}
              onClick={() => {
                setPanelOpen(true);
                setActiveField("dropoff");
              }}
            />
          </div>
          {/* Button */}
          <button
            type="button"
            onClick={async () => {
              if (!pickupLocation || !dropoffLocation) {
                setCheckfields(true);
                setTimeout(() => {
                  setCheckfields(false);
                }, 1500);
              } else {
                await findTrip();
              }
            }}
            className="w-full mt-2 bg-yellow-400 text-black py-2 md:py-3 rounded-lg font-semibold hover:bg-yellow-500 transition-colors"
          >
            Find Ride
          </button>
          {checkfields && (
            <p className="text-red-500 mt-3 text-center text-sm">
              Please fill all fields
            </p>
          )}
        </form>
      </div>
    )}
          {!vehiclePanel && (
            <div
              ref={panelRef}
              className={`md:bg-white relative  md:mt-6 items-center text-center justify-center top-2 md:top-0 overflow-hidden`}
            >
              {panelOpen && (
                <LocationSearchPanle
                setPickupLocation={setPickupLocation}
                  setDropoffLocation={setDropoffLocation}
                  pickupLocation={pickupLocation}
                  dropoffLocation={dropoffLocation}
                  setPanelOpen={setPanelOpen}
                  setVehiclePanel={setVehiclePanel}
                  activeField={activeField}  // Add this prop
                  setActiveField={setActiveField}  // Add this prop
                />
              )}
            </div>
          )}

          <div
            ref={vehiclePanelRef}
            className={`md:ml-12 transition-all ease-linear md:mt-16 ${
              vehiclePanel && !panelOpen ? `visible` : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <VehiclePanel
              selectVehicle={setVehicleType}
              vehiclePanel={vehiclePanel}
              setConfirmRidePanel={setConfirmRidePanel}
              panelOpen={panelOpen}
              setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}
              fare={fare}
            />
          </div>
          <div
            ref={confirmRidePanelRef}
            className={`md:ml-0 transition-all ease-linear md:mt-20 ${
              confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <ConfirmRide
        
            fare={fare}
            vehicleType={vehicleType}
            createRide={createRide}
             pickupLocation={pickupLocation}
             dropoffLocation={dropoffLocation}
              vehiclePanel={vehiclePanel}
              setVehicleFound={setVehicleFound}
              setConfirmRidePanel={setConfirmRidePanel}
              confirmRidePanel={confirmRidePanel}
              panelOpen={panelOpen}
              setVehiclePanel={setVehiclePanel}
              setPanelOpen={setPanelOpen}
            />
          </div>

          <div
            ref={vehicleFoundRef}
            className={`md:ml-0 transition-all ease-linear md:mt-20 ${
              !confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <LookingForDriver
             fare={fare}
             vehicleType={vehicleType}
             pickupLocation={pickupLocation}
             dropoffLocation={dropoffLocation}
             setConfirmRidePanel={setConfirmRidePanel}
              confirmRidePanel={confirmRidePanel}
              vehicleFound={vehicleFound}
              setVehicleFound={setVehicleFound}
              panelOpen={panelOpen}
              setWaitForDriver={setWaitForDriver}
            />
          </div>
          <div
             ref={waitForDriverRef}
            className={`md:ml-0 transition-all ease-linear  ${
            waitForDriver&&  !confirmRidePanel && !vehiclePanel && !panelOpen
                ? `visible`
                : `hidden`
            } w-full z-10  px-2 bg-white `}
          >
            <WaitingForDriver
             waitForDriver={waitForDriver}
              ride={ride}
              setVehicleFound={setVehicleFound}
            />
          </div>
        </div>

        {/* right panel */}
        <div
          className={`flex-1 bg-gray-100 relative m-0 md:m-16`}
          style={{
            position: panelOpen ? "sticky" : "relative",
            top: panelOpen ? "0" : "unset",
            zIndex: panelOpen ? "-10" : "unset",
          }}
        >
          <div className="w-full h-full">
           <LiveTracking key="userDashboard"/>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;

import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { useRef, useState } from "react";
import FinishRide from "../components/FinishRide";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

const CaptainRiding = () => {
  const [finishRidePanel, setFinishRidePanel] = useState(false);
  const finishRidePanelRef = useRef(null);
  useGSAP(() => {
    if (finishRidePanel) {
      gsap.to(finishRidePanelRef.current, {

        transform: "translateY(0)",
      });
    } else {
      gsap.to(finishRidePanelRef.current, {
        height:"0",
        transform: "translateY(130%)",
      });
    }
  }, [finishRidePanel]);
  return (
    <>
      <div className="hidden md:block ">
        <Navbar />
      </div>
      <div className="w-screen fixed px-2 flex md:hidden  justify-between items-center top-4 ">
        <h1 className="text-3xl font-bold  z-20">RapidCap</h1>

        <Link to="/captain-dashboard" className="z-20">
          <i className="text-3xl font-bold w-15 h-15 bg-orange-400 rounded-full p-3 ri-home-3-line"></i>
        </Link>
      </div>

      <div className="flex w-full flex-col-reverse relative  lg:flex-row h-screen">
        {/* Left Section */}
        <div
          className="h-[17%] flex items-center w-full relative justify-between md:h-auto bg-yellow-300 p-4 md:my-12 md"
          onClick={() => {
            setFinishRidePanel(true);
          }}
        >
          <h5 className="absolute  w-[85%] top-0 left-[45%] z-20 md:hidden">
            <i className="text-4xl text-gray-600  ri-arrow-up-wide-line"></i>
          </h5>
          <h1 className="text-xl font-semiold">4 km away</h1>
          <button className=" mt-1 px-10 py-4 text-lg md:w-1/2 md:p-3 md:text-2xl md:font-medium  bg-green-500 text-white font-semibold p-2 rounded-lg">
            Complete Ride
          </button>
         
        </div>

        {/* Right Section */}
        <div className="flex-1 h-[83%] md:mx-10 md:my-12 bg-gray-100">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.8354345082766!2d144.9556516153866!3d-37.81627997975145!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6ad642af0f11fd81%3A0xf5771f4573b3d6b!2sFederation%20Square!5e0!3m2!1sen!2sau!4v1634634920346!5m2!1sen!2sau"
            className="w-full h-full"
            allowFullScreen=""
            loading="lazy"
          ></iframe>
        </div>
        <div
            ref={finishRidePanelRef}
            className="fixed w-full translate-y-full lg:w-1/3 bottom-0  bg-white px-3 py-10 md:mb-24 "
          >
            <FinishRide />
          </div>
      </div>
    </>
  );
};

export default CaptainRiding;

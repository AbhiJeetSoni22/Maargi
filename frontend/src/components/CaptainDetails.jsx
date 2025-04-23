import { useContext } from "react"
import { CaptainDataContext} from "../context/CaptainContext.jsx"
import PropTypes from 'prop-types'
import autoImg from '../assets/auto.png'
import bike from '../assets/bike.png'
import car from '../assets/car.png'
const CaptainDetails = (props) => {

 const { captain }= useContext(CaptainDataContext)
 const capname = captain.fullName.firstName + " " + captain.fullName.lastName
  const vehicleType = captain.vehicle.vehicleType
 if (!captain) {
    return <div>Loading captain details...</div>;
  }

const handleBackToAccept = ()=>{
  props.setConfirmRidePopUpPanel(true)
}
 
  return (
    <div className="w-full md:mt-[-25%]">

  { props.accept &&  <h5 onClick={handleBackToAccept} className="md:hidden fixed px-[40%]  w-full ">
    <i className="text-4xl text-gray-600  ri-arrow-up-wide-line"></i>
    </h5>}
    <div className="flex p-6 md:mb-6 w-full items-center gap-10 justify-between">
            <div className="flex -ml-6 items-center gap-2  justify-start">
                <img className="h-14 w-14 md:h-24 md:w-24 rounded-full object-cover" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSeQjcWR08VdmycDnWSEu8hC5qrduR62zNIhg&s" alt="" />
                <h4 className="text-lg  md:text-2xl font-medium text-gray-700 ">{capname}</h4>
            </div>
            <div>
                <h4 className="text-sm md:text-2xl font-semibold">₹295.20</h4>
                <p className="text-xs md:text-lg text-gray-600">Earned</p>
            </div>
        </div>
        <div className="flex p-4 md:p-9 bg-yellow-300 rounded-xl justify-center gap-4 items-start">
            <div className="text-center bg-gray-100 p-2 rounded-lg">
                <i className="text-2xl md:text-3xl mb-2 font-thin text-gray-600 ri-timer-2-line"></i>
                <h5 className="md:text-lg text-sm font-medium">8.2</h5>
                <p className="md:text-lg text-[10px] text-gray-600">Hours Online</p>
            </div>
            <div  className="text-center  bg-gray-100 p-2 rounded-lg ">
                <i className="text-2xl md:text-3xl mb-2 font-thin text-gray-600 ri-speed-up-line"></i>
                <h5 className="text-sm md:text-lg font-medium">44 </h5>
                <p className="md:text-lg text-[10px] text-gray-600">Distance (km)</p>
            </div>
            <div  className="text-center  bg-gray-100 p-1 md:py-3 md:px-7 px-5 rounded-lg ">
              {
                vehicleType === "auto" && (
                  <div className="p-0">
                    <img src={autoImg} className="h-8 md:h-14" alt="" />
                    <h5 className="text-sm md:text-lg font-medium">vehicle</h5>
                    <p className="text-xs md:text-lg text-gray-600">auto</p>
                  </div>
                )
              }
              {
                vehicleType === "bike" && (
                  <>
                    <img src={bike} className="md:h-14 h-8 " alt="" />
                    <h5 className="text-sm md:text-lg font-medium md:p-0 p-1 ">vehicle</h5>
                    <p className="text-xs md:text-lg text-gray-600">Bike</p>
                  </>
                )
              }
              {
                vehicleType === "car" && (
                  <>
                    <img src={car} className="h-12 md:h-16" alt="" />
                    <h5 className="text-sm font-medium">vehicle</h5>
                    <p className="text-xs text-gray-600">Car</p>
                  </>
                )
              }
            </div>
        </div>
        </div> 
  )
}
CaptainDetails.propTypes = {
  accept:PropTypes.bool,
  ride: PropTypes.object,
  setConfirmRidePopUpPanel: PropTypes.func
}


export default CaptainDetails

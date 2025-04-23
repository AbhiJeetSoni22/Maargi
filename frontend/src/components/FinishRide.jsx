import PropTypes from 'prop-types';
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
const FinishRide = (props) => {
  const navigate = useNavigate()
const endRide = async()=>{
  const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/rides/end-ride`,{
    rideId:props.ride._id
  },
 {   headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    }});
  if(response.status===200){
    navigate('/captain-dashboard')
  }
}
  return (
    <div className="z-200 md:ml-6 md:mt-[-10%] p-6 relative h-screen w-full bg-white ">
      <h5
        className="fixed z-[100] top-0 left-0 text-center w-full  bg-gray-700 md:hidden"
        onClick={() => {
          props.setFinishRidePanel(false);
         
        }}
      >
        <i className="text-4xl h-10 w-10 text-gray-400 ri-arrow-down-wide-line"></i>
      </h5>
      <h2 className="text-xl font-semibold md:text-3xl mb-2  md:mt-4 ">
      Finish Ride
      </h2>
      <div className="flex  items-center w-full p-2 md:p-4 justify-between border border-yellow-400 bg-yellow-200 rounded-lg ">
        <div className="flex my-2  items-center gap-4">
          <img
            className="h-12 md:h-16 ml-2 md:w-16 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU"
            alt=""
          />
          <h2 className="text-lg md:text-2xl font-medium">{props.ride?.user?.fullName?.firstName}  {props.ride?.user?.fullName?.lastName} </h2>
        </div>
        <h4 className="text-gray-600 text-lg font-medium md:text-xl mr-2">
          2.2 Km
        </h4>
      </div>
      <div className="flex gap-2 justify-between items-center flex-col ">
        <div className="w-full">
          <div className="flex items-center gap-5  p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
            <div>
              <h3 className="text-sm md:text-2xl font-medium">Pickup Location</h3>
              <p className="text-xs md:text-lg  text-gray-600">
               {props.ride?.pickup}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5 border-t-2 border-b-2  p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
            <div>
              <h3 className="text-sm md:text-2xl font-medium">Destination Location</h3>
              <p className="text-xs md:text-lg  text-gray-600">
               {props.ride?.destination}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300">
            <i className="text-xl md:text-3xl ri-wallet-fill"></i>
            <div>
              <h3 className="text-sm md:text-2xl font-medium">Cash</h3>
              <p className="text-xs  md:text-lg text-gray-600">₹{props.ride?.fare}</p>
            </div>
          </div>
        </div>

       <div className="md:mt-4 mt-2 w-full items-center">
         <button onClick={endRide} className="w-2/3 ml-[15%] md:ml-[13%]  mt-1 flex justify-center   md:p-3 md:text-xl md:font-medium  bg-green-500 text-white font-semibold p-3 rounded-lg">
          Finish Ride
        </button>
       </div>

       <p className='text-xs md:lg text-gray-700 mt-6'>Click on finish ride button if you get the Payment</p>
      </div>
    </div>
  )
}
FinishRide.propTypes = {
  ride: PropTypes.object,
  setFinishRidePanel: PropTypes.func
};
export default FinishRide

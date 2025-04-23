import PropTypes from 'prop-types';
const RidePopUp = (props) => {
  return (
    <div className="relative  md:ml-8 z-30">
    
      <h2 className="text-xl  font-semibold md:text-3xl mb-3 ">
        New Ride Request
      </h2>
      <div className="flex  items-center justify-between bg-yellow-400 rounded-lg ">
        <div className="flex my-2  items-center gap-4">
          <img
            className="h-12 md:h-16 ml-2 md:w-16 w-12 rounded-full object-cover"
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRRvnCAL58JHR2UOR_kIDLd0YICJKqBVMtIjeTfJ6nUk7iZhrVuVGaB90bsmsJ04gRvLAk&usqp=CAU"
            alt=""
          />
          <h2 className="text-lg md:text-2xl font-medium">{props.ride?.user.fullName.firstName + " " + props.ride?.user.fullName.lastName}</h2>
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

      <div className='flex w-full items-center justify-between gap-2 px-5'>
      <button
          className=" mt-1 py-2 px-10 md:py-4 text-sm md:w-1/2 md:p-3 md:text-2xl md:font-medium  bg-gray-300 text-gray-700 font-semibold p-2 rounded-lg"
          onClick={() => {
            props.setAccept(false)
            props.setridePopUpPanel(false);
          }}
          >
          Ignore
        </button>
          <button className=" mt-1 px-10 py-2 md:py-4 text-sm md:w-1/2 md:p-3 md:text-2xl md:font-medium  bg-green-500 text-white font-semibold p-2 rounded-lg"
            onClick={()=>{
              props.confirmRide();
                props.setConfirmRidePopUpPanel(true)
                props.setAccept(true)
              }}
              >
          Accept
        </button>
       
      </div>
      </div>
    </div>
  );
}
RidePopUp.propTypes = {
accept:PropTypes.bool,
ride: PropTypes.object,
confirmRide: PropTypes.func,
setAccept: PropTypes.func,
setConfirmRidePopUpPanel: PropTypes.func.isRequired,
setridePopUpPanel: PropTypes.func.isRequired
};

export default RidePopUp;



import PropTypes from 'prop-types';


const WaitingForDriver = (props) => {


  return (
    <div>
        <h1 className='text-lg md:text-3xl font-semibold'>Waiting for Driver</h1>
      <div>
         <div className='flex items-center justify-between mb-3 '>
         
         {
              props.ride?.vehicleType === 'car' &&
              <img
                className="h-20 md:h-24 mt-1"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
              }
              {
              props.ride?.vehicleType === 'bike' &&
                <img
                className="h-16 md:h-24 mt-3"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                alt=""
              />
                }
                {
                props.ride?.vehicleType === 'auto' &&
                  <img
                  className="h-16 md:h-24 mt-3"
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                  alt=""
                />
                }
         <div className='text-right'>
            <h2 className='text-sm md:text-2xl font-medium capitalize'>{props.ride?.captain.fullName.firstName} </h2>
            <h3 className='text-sm font-semibold md:text-3xl '>{props.ride?.captain.vehicle.plate}</h3>
            <p className='text-sm md:text-lg text-gray-600'>{props.ride?.vehicleType|| "vehicle"} </p>
            <p className='text-sm md:text-2xl text-gray-800'>Your OTP - {props.ride?.otp}</p>
         </div>
        </div>
   
        <div className="flex gap-2 justify-between items-center flex-col ">
       
          <div className="w-full">
            <div className="flex items-center gap-5  border-t-2 border-b-2 p-3 ">
              <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
              <div>
                <h3 className="text-sm md:text-2xl font-medium">Pickup Location</h3>
                <p className="text-xs md:text-lg  text-gray-600">
                  {props.ride?.pickup}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300">
              <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
              <div>
                <h3 className="text-sm md:text-2xl font-medium">Destination Location</h3>
                <p className="text-xs md:text-lg  text-gray-600">
                {props.ride?.destination}
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5  border-t-2 p-3">
              <i className="text-xl md:text-3xl ri-wallet-fill"></i>
              <div>
                <h3 className="text-sm md:text-2xl font-medium">Cash</h3>
                <p className="text-sm  md:text-lg text-gray-600">₹{props.ride?.fare}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

WaitingForDriver.propTypes = {
  ride:PropTypes.object,
  vehicleFound: PropTypes.bool,
  waitForDriver: PropTypes.bool,
  setVehicleFound: PropTypes.func,
  
};

export default WaitingForDriver;

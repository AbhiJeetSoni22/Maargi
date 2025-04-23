import PropTypes from 'prop-types';

const LookingForDriver = (props) => {
  return (
    <div>
    <h2 className="text-xl font-semibold md:text-3xl ">Wait... Looking for a Driver</h2>
         
           <div className="flex gap-2 justify-between items-center flex-col ">
           {
                props.vehicleType === 'car' &&
              <img
                className="h-20 md:h-28 mt-1"
                src="https://www.pngplay.com/wp-content/uploads/8/Uber-PNG-Photos.png"
                alt=""
              />
              }
              {
                props.vehicleType === 'bike' &&
                <img
                className="h-16 md:h-24 mt-2 md:mt-5"
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRQTJw6dzEo1MYXOAbONCG1oL82rxU_Bitb-g&s"
                alt=""
              />
                }
                {
                  props.vehicleType === 'auto' &&
                  <img
                  className="h-16 md:h-28 mt-3"
                  src="https://www.uber-assets.com/image/upload/f_auto,q_auto:eco,c_fill,h_368,w_552/v1648431773/assets/1d/db8c56-0204-4ce4-81ce-56a11a07fe98/original/Uber_Auto_558x372_pixels_Desktop.png"
                  alt=""
                />
                }
             <div className='w-full'>
             <div className='flex items-center gap-5  p-3 border-t-gray-300 border-b-gray-300'>
                        <i className="text-xl md:text-3xl ri-map-pin-2-fill"></i>
                       <div>
                       <h3 className='text-sm md:text-2xl font-medium'>Pickup Location</h3>
                       <p className='text-xs md:text-lg  text-gray-600'>{props.pickupLocation}</p>
                       </div>
                     </div>
                     <div className='flex items-center gap-5 border-t-2 border-b-2  p-3 border-t-gray-300 border-b-gray-300'>
                     <i className="text-xl md:text-3xl ri-map-pin-user-fill"></i>
                       <div>
                       <h3 className='text-sm md:text-2xl font-medium'>Destination</h3>
                       <p className='text-xs md:text-lg  text-gray-600'>{props.dropoffLocation}</p>
                       </div>
                     </div>
                     <div className='flex items-center gap-5   p-3 border-t-gray-300 border-b-gray-300'>
                     <i className="text-xl md:text-3xl ri-wallet-fill"></i>
                       <div>
                       <h3 className='text-sm md:text-2xl font-medium'>Cash</h3>
                       <p className='text-xs  md:text-lg text-gray-600'>₹{props.fare[props.vehicleType]}</p>
                       </div>
                     </div>
                     
                    
             </div>
             
           </div>
   </div>
  )
}

LookingForDriver.propTypes={
  fare:PropTypes.object,
   vehicleType: PropTypes.string,
    vehicleFound: PropTypes.bool,
    confirmRidePanel: PropTypes.bool,
    panelOpen: PropTypes.bool,
    pickupLocation: PropTypes.string,
    dropoffLocation: PropTypes.string,
    setVehicleFound: PropTypes.func,
    setConfirmRidePanel: PropTypes.func,
    setWaitForDriver: PropTypes.func
};

export default LookingForDriver

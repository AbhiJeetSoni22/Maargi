import Navbar from './Navbar'
import {  useLocation, useNavigate } from 'react-router-dom'

const Help = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = location.state?.userType || location.state?.user; // Handle both userType and user
  
  const handleHome = () => {
    if (user === "user") {

      navigate('/dashboard');
    } else {
    
      navigate('/captain-dashboard');
    }
  }
 const handleLogout = ()=>{
  if(user === "user"){
    localStorage.removeItem('token')
    navigate('/login')
  }
  else{
    localStorage.removeItem('token')
    navigate('/captain-login')
  }
 }
  return (
    <div>
      <div className="hidden md:block">
        <Navbar user={user} />
      </div>
      <div className="w-screen bg-white  border-b-2 border-b-gray-600  pb-5 fixed z-20 px-2 flex md:hidden justify-between items-center pt-5 top-0">
        <h1 className="text-xl md:text-3xl font-bold z-20">Maargi</h1>
        <div>

        <button onClick={handleHome} className="mr-2 z-20">
          <i className="text-xl md:text3xl font-bold w-15 h-15 bg-green-400 rounded-full p-3 ri-home-3-line"></i>
        </button>
        <button onClick={handleLogout} className="z-20">
          <i className="text-xl md:text3xl font-bold w-15 h-15 bg-yellow-400 rounded-full p-3 ri-logout-box-r-line"></i>
        </button>
        </div>
      </div>
      <div className="max-w-4xl mt-20 md:mt-0 mx-auto p-5">
        <h1 className="text-2xl md:text-3xl font-bold mb-8">How to Use Maargi ?</h1>
        
        {user === "user" ? (
          // User Instructions
          <div className="space-y-6">
            <h2 className="text-lg md:text-2xl font-semibold mb-4">For Passengers</h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">How to Book a Ride</h3>
              <ol className="list-decimal ml-6 space-y-3">
                <li>Enter your pickup location in the &quot;Pickup location&quot; field</li>
                <li>Enter your destination in the &quot;Destination&quot; field</li>
                <li>Click &quot;Find Ride&quot; to proceed</li>
                <li>Select your preferred vehicle type (Auto, Car, or Bike)</li>
                <li>Review fare and click &quot;Confirm&quot; to request ride</li>
                <li>Wait while we find a nearby driver</li>
                <li>Once a driver accepts, you&apos;ll see their details and OTP</li>
                <li>Share the OTP with driver when they arrive</li>
                <li>After reaching destination, make payment and rate your ride</li>
              </ol>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Important Tips</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Keep your OTP confidential until driver arrives</li>
                <li>Verify vehicle number and driver details before boarding</li>
                <li>Track your ride in real-time using the map</li>
                <li>Contact support if you need any assistance</li>
              </ul>
            </div>
          </div>
        ) : (
          // Captain Instructions
          <div className="space-y-6">
            <h2 className="text-lg font-semibold mb-4">For Captains </h2>
            
            <div className="bg-yellow-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">How to Accept Rides</h3>
              <ol className="list-decimal ml-6 space-y-3">
                <li>Keep your app active to receive ride requests</li>
                <li>New ride requests will appear with passenger details</li>
                <li>Review pickup location and fare before accepting</li>
                <li>Click &quot;Accept&quot; to take the ride</li>
                <li>Navigate to pickup location shown on map</li>
                <li>Ask passenger for OTP and enter it to start ride</li>
                <li>Follow map navigation to reach destination</li>
                <li>Click &quot;Complete Ride&quot; after reaching destination</li>
              </ol>
            </div>

            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="text-xl font-medium mb-3">Important Guidelines</h3>
              <ul className="list-disc ml-6 space-y-2">
                <li>Always verify passenger OTP before starting ride</li>
                <li>Follow traffic rules and drive safely</li>
                <li>Keep your vehicle clean and maintained</li>
                <li>Be professional and courteous with passengers</li>
                <li>Contact support for any technical issues</li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Help

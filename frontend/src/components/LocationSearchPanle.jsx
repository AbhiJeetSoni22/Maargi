import 'remixicon/fonts/remixicon.css';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useEffect, useState } from 'react';

const LocationSearchPanle = ({ 
  setPickupLocation, 
  setDropoffLocation, 
  pickupLocation, 
  dropoffLocation, 
  activeField 
}) => {
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSuggestions = async () => {
      try {
        const searchText = activeField === 'pickup' ? pickupLocation : dropoffLocation;
        if (searchText.length >= 3) {
          const response = await axios.get(
            `${import.meta.env.VITE_BASE_URL}/maps/get-suggestions`, 
            {
              params: { input: searchText },
              headers: {
                'Authorization': `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/json'
              },
              timeout: 8000
            }
          );
          setSuggestions(response.data);
          setError(null);
        } else {
          setSuggestions([]);
        }
      } catch (error) {
       
        setSuggestions([]);
        setError('Could not fetch suggestions');
        
        // Handle specific error cases
        if (error.code === 'ERR_NETWORK') {
          setError('Network error - please check your connection');
        }
      }
    };

    // Debounce the API calls
    const debounceTimer = setTimeout(fetchSuggestions, 300);
    return () => clearTimeout(debounceTimer);
  }, [pickupLocation, dropoffLocation, activeField]);

  return (
    <div className="relative sm:w-full sm:text-center text-center md:mt-0">
      <div className="bg-white rounded-lg shadow-lg z-10 w-full max-w-md md:max-w-lg absolute top-0 left-0">
        {error && (
          <div className="text-red-500 p-2 text-sm">{error}</div>
        )}
        {suggestions.map((suggestion, index) => (
          <div
            key={index}
            onClick={() => {
              if (activeField === 'pickup') {
                setPickupLocation(suggestion);
              } else {
                setDropoffLocation(suggestion);
              }
            }}
            className="flex gap-4 items-center p-3 active:border-black my-2 rounded-lg border-2 hover:bg-gray-200 cursor-pointer"
          >
            <h2 className="bg-[#eee] h-10 w-10 flex items-center justify-center rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24px"
                height="24px"
                viewBox="0 0 24 24"
                fill="rgba(255,190,78,1)"
              >
                <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
              </svg>
            </h2>
            <p className="text-sm font-medium text-gray-700">
              {suggestion}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

LocationSearchPanle.propTypes = {
  setPickupLocation: PropTypes.func.isRequired,
  setDropoffLocation: PropTypes.func.isRequired,
  pickupLocation: PropTypes.string.isRequired,
  dropoffLocation: PropTypes.string.isRequired,
  activeField: PropTypes.string.isRequired
};

export default LocationSearchPanle;

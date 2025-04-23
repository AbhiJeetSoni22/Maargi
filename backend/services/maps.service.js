import axios from 'axios';


const getAddressCoordinate = async (address) => {
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${apiKey}`;

  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK' && response.data.results.length > 0) {
      const location = response.data.results[0].geometry.location;
      return {
        lat: location.lat,
        lng: location.lng,
      };
    } else if (response.data.status === 'ZERO_RESULTS') {
      console.warn('No results found for:', address);
      return { error: 'Location not found. Please check the address and try again.' };
    } else {
      console.error('Unexpected API response:', response.data);
      throw new Error(`Error from API: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching coordinates:', error.message);
    throw new Error('Error fetching coordinates');
  }
};

const getDistanceTime = async (origin, destination) => {
  if(!origin || !destination) {
    throw new Error('Origin and destination are required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/distancematrix/json?origins=${encodeURIComponent(origin)}&destinations=${encodeURIComponent(destination)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK' ) {
      const distance = response.data.rows[0].elements[0].distance.text;
      const time = response.data.rows[0].elements[0].duration.text;
      return {
        distance,
        time,
      };
    }
    else {
      console.error('Unexpected API response:', response.data);
      throw new Error(`Error from API: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching distance and time:', error.message);
    throw new Error('Error fetching distance and time');
  }
}

const getAutoCompleteSuggestions = async (input) => {
  if(!input) {
    throw new Error('query is required');
  }
  const apiKey = process.env.GOOGLE_MAPS_API;
  const url = `https://maps.gomaps.pro/maps/api/place/autocomplete/json?input=${encodeURIComponent(input)}&key=${apiKey}`;
  try {
    const response = await axios.get(url);
    if (response.data.status === 'OK' ) {
      return response.data.predictions.map((prediction) => prediction.description);
    }
    else {
      console.error('Unexpected API response:', response.data);
      throw new Error(`Error from API: ${response.data.status}`);
    }
  } catch (error) {
    console.error('Error fetching autocomplete suggestions:', error.message);
    throw new Error('Error fetching autocomplete suggestions');
  }
}

export { getAddressCoordinate,getDistanceTime,getAutoCompleteSuggestions};

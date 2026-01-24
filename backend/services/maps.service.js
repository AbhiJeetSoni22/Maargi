import axios from 'axios';

// 1. Address to Coordinates (Nominatim)
const getAddressCoordinate = async (address) => {
    const url = `https://nominatim.openstreetmap.org/search?q=${encodeURIComponent(address)}&format=json&limit=1`;
    try {
        const response = await axios.get(url, { headers: { 'User-Agent': 'Maargi-App' } });
        if (response.data && response.data.length > 0) {
            return {
                lat: parseFloat(response.data[0].lat),
                lng: parseFloat(response.data[0].lon), // OSM uses 'lon'
            };
        }
        throw new Error('Location not found');
    } catch (error) {
        throw new Error('Geocoding failed');
    }
};

// 2. Distance and Time (OSRM)
const getDistanceTime = async (origin, destination) => {
    // origin/destination should be {lat, lng}
    const url = `https://router.project-osrm.org/route/v1/driving/${origin.lng},${origin.lat};${destination.lng},${destination.lat}?overview=false`;
    try {
        const response = await axios.get(url);
        if (response.data.code === 'Ok') {
            const route = response.data.routes[0];
            return {
                distance: (route.distance / 1000).toFixed(2) + ' km',
                time: Math.round(route.duration / 60) + ' mins',
            };
        }
        throw new Error('No route found');
    } catch (error) {
        throw new Error('Distance calculation failed');
    }
};

// 3. Autocomplete (Photon)
const getAutoCompleteSuggestions = async (input) => {
    const url = `https://photon.komoot.io/api/?q=${encodeURIComponent(input)}&limit=5`;
    try {
        const response = await axios.get(url);
        return response.data.features.map(f => {
            const p = f.properties;
            return `${p.name || ''}, ${p.city || ''}, ${p.country || ''}`.replace(/^, /, '');
        });
    } catch (error) {
        return [];
    }
};

export { getAddressCoordinate, getDistanceTime, getAutoCompleteSuggestions };
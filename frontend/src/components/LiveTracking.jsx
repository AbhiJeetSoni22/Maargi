import { useRef, useEffect } from "react";
import tt from "@tomtom-international/web-sdk-maps";
import "@tomtom-international/web-sdk-maps/dist/maps.css";
import '@tomtom-international/web-sdk-services';
import PropTypes from "prop-types";

const LiveTracking = (props) => {
  const mapElement = useRef(null);
  const map = useRef(null);
  const apiKey = import.meta.env.VITE_TOM_MAPS;

  const createCustomMarker = (coordinates,iconUrl) => {
    const markerElement = document.createElement('div');
    markerElement.style.width = '40px';
    markerElement.style.height = '40px';
    markerElement.style.backgroundImage = `url(${iconUrl})`;
    markerElement.style.backgroundSize = 'contain';
    markerElement.style.backgroundRepeat = 'no-repeat';

    return new tt.Marker({ element: markerElement }).setLngLat(coordinates);
  };

  const drawRoute = async (pickup, destination) => {
    try {
      // Remove existing route if it exists
      if (map.current.getSource('route')) {
        // Remove all layers that use this source first
        if (map.current.getLayer('route-line')) {
          map.current.removeLayer('route-line');
        }
        // Then remove the source
        map.current.removeSource('route');
      }

      const response = await fetch(
        `https://api.tomtom.com/routing/1/calculateRoute/${pickup[1]},${pickup[0]}:${destination[1]},${destination[0]}/json?key=${apiKey}`
      );
      const data = await response.json();
      const coordinates = data.routes[0].legs[0].points.map(point => [point.longitude, point.latitude]);

      // Add new source
      map.current.addSource('route', {
        type: 'geojson',
        data: {
          type: 'Feature',
          properties: {},
          geometry: {
            type: 'LineString',
            coordinates: coordinates,
          },
        },
      });

      // Add new layer
      map.current.addLayer({
        id: 'route-line',
        type: 'line',
        source: 'route',
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#000',
          'line-width': 3,
        },
      });

      // Adjust map to fit the route
      const bounds = new tt.LngLatBounds();
      coordinates.forEach(coord => bounds.extend(coord));
      map.current.fitBounds(bounds, { padding: 50 });

    } catch (error) {
      console.error('Error drawing route:', error);
    }
  };

  const getCoordinates = async (address) => {
    try {
      const response = await fetch(
        `https://api.tomtom.com/search/2/geocode/${encodeURIComponent(address)}.json?key=${apiKey}`
      );
      const data = await response.json();
      if (data.results && data.results.length > 0) {
        return {
          lng: data.results[0].position.lon,
          lat: data.results[0].position.lat,
        };
      }
      return null;
    } catch (error) {
      console.error('Geocoding error:', error);
      return null;
    }
  };

  const getCurrentLocation = async () => {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.error('Error getting current location:', error);
            reject(null);
          }
        );
      } else {
        console.error('Geolocation is not supported by this browser.');
        reject(null);
      }
    });
  };

  useEffect(() => {
    const initializeMap = async () => {
      const defaultCenter = [77.4126, 23.2599]; // Default center if geolocation fails

      map.current = tt.map({
        key: apiKey,
        container: mapElement.current,
        center: defaultCenter,
        zoom: 13,
      });

      if (props.ride?.pickup && props.ride?.destination) {
        const pickupCoords = await getCoordinates(props.ride.pickup);
        const destCoords = await getCoordinates(props.ride.destination);

        if (pickupCoords && destCoords) {
          createCustomMarker(
            [pickupCoords.lng, pickupCoords.lat],
            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQn9F7aZM2WBDXuPG6nm2zywEihBBjnYflnlw&s' // Pickup icon URL
          ).addTo(map.current);

          createCustomMarker(
            [destCoords.lng, destCoords.lat],
            'https://cdn-icons-png.flaticon.com/512/1865/1865269.png' // Destination icon URL
          ).addTo(map.current);

          await drawRoute(
            [pickupCoords.lng, pickupCoords.lat],
            [destCoords.lng, destCoords.lat]
          );
        }
      } else {
        const currentLocation = await getCurrentLocation();
        if (currentLocation) {
          map.current.setCenter([currentLocation.lng, currentLocation.lat]);
          createCustomMarker(
            [currentLocation.lng, currentLocation.lat],
            'https://cdn-icons-png.flaticon.com/512/684/684908.png' // Current location icon URL
          ).addTo(map.current);
        }
      }
    };

    initializeMap();

    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [apiKey, props.ride]);

  return (
    <div
      ref={mapElement}
      className="h-[100vh]  w-[100%] rounded-lg shadow-lg border-2 border-gray-300"
    />
  );
};

LiveTracking.propTypes = {
  ride: PropTypes.object,
};

export default LiveTracking;

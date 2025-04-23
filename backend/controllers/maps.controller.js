import { Captain } from "../models/captain.model.js";
import { getAddressCoordinate,getDistanceTime,getAutoCompleteSuggestions } from "../services/maps.service.js";
import { validationResult } from "express-validator";

const getCoordinates = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
  const address = req.query.address;
  try {
    const coordinates = await getAddressCoordinate(address);
    res.status(200).json(coordinates);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Coordinate not found" });
  }
}

const getAddressesDistanceTime = async (req, res) => {
  const { origin, destination } = req.query;
  try {
    const distanceTime = await getDistanceTime(origin, destination);
    res.status(200).json(distanceTime);
  } catch (error) {
    console.error(error);
    res.status(404).json({ error: "Distance and time not found" });
  }
}

const getSuggestions = async (req, res) => {
   try {
       const errors = validationResult(req);
       if (!errors.isEmpty()) {
         return res.status(400).json({ errors: errors.array() });
       }

       const input = req.query.input;


       const suggestions = await getAutoCompleteSuggestions(input);
       
       // Return empty array if no suggestions
       return res.status(200).json(suggestions || []);
   } catch (error) {
       console.error('Error getting suggestions:', error);
       // Return empty array instead of error
       return res.status(200).json([]);
   }
};

const getCaptainsInTheRadius = async(lat, lng, radius, vehicleType) => {
  try {
    // Validate coordinates and vehicleType
    if (!lat || !lng || !vehicleType) {
      console.error('Invalid parameters:', { lat, lng, vehicleType });
      return [];
    }

    const captains = await Captain.find({
      'location.lat': { 
        $exists: true,
        $gte: lat - radius, 
        $lte: lat + radius 
      },
      'location.lng': { 
        $exists: true,
        $gte: lng - radius, 
        $lte: lng + radius 
      },
      'vehicle.vehicleType': vehicleType,
    });
    return captains;
  } catch (error) {
    console.error('Error finding captains:', error);
    return [];
  }
};

export  { getCoordinates,getAddressesDistanceTime , getSuggestions,getCaptainsInTheRadius};
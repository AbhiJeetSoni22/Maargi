import { createRide, getFare,confirmRideService,startRideService,endRideService } from "../services/ride.service.js";
import { validationResult } from "express-validator";
import { getCaptainsInTheRadius} from "./maps.controller.js";
import { getAddressCoordinate } from "../services/maps.service.js";
import { sendMessageToSocketId } from "../socket.js";
import { Ride } from "../models/ride.model.js";


const createRideController = async (req, res) => {
  try {
    const { pickup, destination, vehicleType } = req.body;
    
    // Create ride first
    const ride = await createRide({ 
      user: req.user._id, 
      pickup, 
      destination, 
      vehicleType 
    });

    // Get coordinates
    const pickupCoordinates = await getAddressCoordinate(pickup);
    if (!pickupCoordinates) {
      return res.status(400).json({ error: "Could not get coordinates for pickup location" });
    }

    // Find available captains
    const availableCaptains = await getCaptainsInTheRadius(
      pickupCoordinates.lat,
      pickupCoordinates.lng,
      5,
      vehicleType
    );

    console.log('Available captains:', availableCaptains.length);

    const rideWithUser = await Ride.findById(ride._id).populate('user');

    // Send response first
    res.status(201).json({ message: "Ride created successfully", ride });

    // Then notify captains
    for (const captain of availableCaptains) {
      if (captain.socketId) {
        console.log('Sending ride request to captain:', captain._id, 'Socket ID:', captain.socketId);
        sendMessageToSocketId(captain.socketId, {
          event: 'new-ride',
          data: rideWithUser
        });
      }
    }
  } catch (error) {
    console.error('Error creating ride:', error);
    if (!res.headersSent) {
      res.status(500).json({ error: "Internal server error" });
    }
  }
};

const getFareController = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors
            .array() });
    }
    const { pickup, destination } = req.query;
    try {
        const fare = await getFare( pickup, destination);
        res.status(200).json({ message: "Fare calculated successfully", fare });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error" });
    }
}
const confirmRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
      // Note: req.cap should be req.captain
      const ride = await confirmRideService({ rideId, captain: req.cap });
      console.log('Ride confirmed:', ride);

      // Emit event to user after successful confirmation
      if (ride.user && ride.user.socketId) {
          sendMessageToSocketId(ride.user.socketId, {
              event: 'ride-confirmed',
              data: ride
          });
      }

      return res.status(200).json(ride);
  } catch (err) {
      console.error('Error during confirming ride:', err);
      return res.status(500).json({ message: err.message });
  }
}
const startRide = async (req,res)=>{
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { rideId,otp } = req.query;
  try{
      // Note: req.cap should be req.captain
      const ride = await startRideService({ rideId,otp, captain: req.cap });
      console.log('Ride started:', ride);
      return res.status(200).json(ride);
  } catch (err) {
      console.error('Error during starting ride:', err);
      return res.status(500).json({ message: err.message });
  }
}

const endRide = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
  }
  const { rideId } = req.body;
  try {
      // Note: req.cap should be req.captain
      const ride = await endRideService({ rideId, captain: req.cap });
      sendMessageToSocketId(ride.user.socketId,{
          event: 'ride-ended',
          data: ride,
      })
      console.log('Ride ended:', ride);
      return res.status(200).json(ride);
  } catch (err) {
      console.error('Error during ending ride:', err);
      return res.status(500).json({ message: err.message });
  }
}
export { createRideController, getFareController, confirmRide, startRide,endRide};

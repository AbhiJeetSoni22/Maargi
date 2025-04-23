import { Captain } from "../models/captain.model.js";

async function createCap({
  firstName,
  lastName,
  email,
  password,
  color,
  plate,
  capacity,
  vehicleType,
}) {
  try {
    if (
      !firstName ||
      !email ||
      !password ||
      !color ||
      !plate ||
      !capacity ||
      !vehicleType
    ) {
      throw new Error("All fields are required");
    }

    const existingCap = await Captain.findOne({ email });
    if (existingCap) {
      throw new Error("Email already exists");
    }

    const captain = await Captain.create({
      fullName: {
        firstName,
        lastName,
      },
      email,
      password,
      vehicle: {
        color,
        plate,
        capacity,
        vehicleType
      },
    });
    return captain;
  } catch (error) {
    console.log("error during creating captain");
    return null;
  }
}

export default createCap;
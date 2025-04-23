import { Captain } from "../models/captain.model.js";
import createCap from "../services/captain.service.js";
import { validationResult } from "express-validator";
import BlacklistingToken from "../models/blacklistingToken.model.js";

async function registerCap(req,res){
try {     
   const error = validationResult(req);
   if(!error.isEmpty()){
        return res.status(400).json({ errors: error.array() });
   }
   const { fullName, email, password, vehicle }= req.body;
   const isCaptainAlreadyExists = await Captain.findOne({email})
   if(isCaptainAlreadyExists){
        return res.status(400).json({ msg: "Captain with this email already exists" });
   }   
   const captain = await createCap({
    firstName: fullName?.firstName,
    lastName: fullName?.lastName,
    email,
    password,
    color: vehicle?.color,
    plate: vehicle?.plate,
    capacity: vehicle?.capacity,
    vehicleType: vehicle?.vehicleType,
})
const token = await captain.generateAuthToken();
return res.status(201).json({ captain, token });
} catch (error) {
    res.status(500).json({error})
}
}

async function loginCap(req,res){
    try {     
       const error = validationResult(req);
       if(!error.isEmpty()){
            return res.status(400).json({ errors: error.array() });
       }
      const {email,password} = req.body;
      const captain = await Captain.findOne({email}).select('+password');
      if(!captain) return res.status(401).json({ msg: 'Invalid email or password' });
      const checkPassword = await captain.comparePassword(password)
      if(!checkPassword) return res.status(400).json({ msg: 'Invalid email or password' });
      const token = await captain.generateAuthToken();
      res.cookie('token', token)
      return res.status(200).json({ msg:"Captain logged in successfully", captain, token})
    } catch (error) {
        res.status(500).json({error})
    }
}

async function getCaptainsProfile(req,res){
   try {     
       return res.status(200).json(req.cap);
   } catch (error) {
       res.status(500).json({error})
   }
}

async function logoutCap(req,res){
    try {   
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1]  
        await BlacklistingToken.create({token})
       res.clearCookie('token')
       return res.status(200).json({ msg:"Captain logged out successfully"});
    } catch (error) {
        res.status(500).json({error})
    }
}

export {registerCap,loginCap,getCaptainsProfile,logoutCap}
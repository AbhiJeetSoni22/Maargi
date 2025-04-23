import express from 'express';
import{ registerCap ,loginCap,getCaptainsProfile,logoutCap}from '../controllers/captain.controller.js';
import { body } from 'express-validator';
import { authCap } from "../middleware/auth.middleware.js";
const router = express.Router();

router.post('/register',[
    body('fullName.firstName').isLength({ min:3 }).withMessage('First name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long'),
    body('vehicle.color').isLength({ min:3 }).withMessage('vehicle color must be at least 3 characters long'),
    body('vehicle.plate').isLength({ min:3 }).withMessage('vehicle plate must have at least 5 characters'),
    body('vehicle.capacity').isInt({ min:1 }).withMessage('vehicle capacity must be minimum 1'),
    body('vehicle.vehicleType').isIn(['car','bike','auto']).withMessage('Invalid vehice type')
],registerCap)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],loginCap)

router.get('/profile',authCap,getCaptainsProfile)  //auth middleware is used here to check if user is authenticated before accessing this route.  if not authenticated, it will return 401 status.  if authenticated, it will proceed to getCaptain's profile.

router.get('/logout',authCap,logoutCap)

export default router  
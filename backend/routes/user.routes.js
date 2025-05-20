import express from 'express';
import { body } from 'express-validator'
import{ authUser} from '../middleware/auth.middleware.js';
import { registerUser,loginUser,changePassword,getUserProfile,logoutUser, forgetPassword } from '../controllers/user.controller.js';
const router = express.Router();


router.post('/register',[
    body('fullName.firstName').isLength({ min:3 }).withMessage('Name must be at least 3 characters long'),
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],registerUser)

router.post('/login',[
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('password').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
],loginUser)

router.patch('/changePassword',authUser,changePassword) 

router.post('/forgetPassword', [
    body('email').isEmail().withMessage('Please enter a valid email'),
    body('newPassword').isLength({ min: 5 }).withMessage('Password must be at least 5 characters long')
], forgetPassword);

router.get('/profile',authUser,getUserProfile)
router.get('/logout',authUser,logoutUser)

export default router;
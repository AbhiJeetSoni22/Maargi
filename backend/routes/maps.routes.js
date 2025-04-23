import express from 'express';
import { getCoordinates,getAddressesDistanceTime, getSuggestions } from '../controllers/maps.controller.js';
import { authUser,authCap } from '../middleware/auth.middleware.js';
import { query } from 'express-validator';
const router = express.Router();

router.get('/get-coordinate',query('address').isString().isLength({min: 3}),authUser ,getCoordinates);

router.get('/get-destance-time',query('origin').isString().isLength({min: 3}),query('destination').isString().isLength({min: 3}),authCap ,getAddressesDistanceTime);

router.get('/get-suggestions',query('input').isString().isLength({min: 3}),authUser ,getSuggestions);

export default router;
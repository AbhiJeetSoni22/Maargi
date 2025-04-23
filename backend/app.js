import express from 'express';
import cors from 'cors';
import userRoutes from './routes/user.routes.js';
import captainRoutes from './routes/captain.routes.js';
import cookieParser from 'cookie-parser';
import mapsRoutes from './routes/maps.routes.js';
import rideRoutes from './routes/ride.routes.js';

const app = express();

// CORS configuration
app.use(cors({
    origin: ['https://maargi.vercel.app/', 'http://localhost:5173'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use('/users', userRoutes);
app.use('/captains', captainRoutes);
app.use('/maps', mapsRoutes);
app.use('/rides', rideRoutes);

export default app;
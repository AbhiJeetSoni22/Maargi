import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();
// Connect to MongoDB
async function dbConnection(){
    try {
        await mongoose.connect(process.env.MONGODB_URL)
        console.log('Connected to MongoDB!')
    } catch (error) {
        console.log(`error during database connection ${error}`)
    }
}

export default dbConnection;
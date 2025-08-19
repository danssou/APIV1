import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";


if(!DB_URI) {
    throw new Error('Please define the mongoURI in the .enn.{production/development}.local file')
};

export const connectDB = async () => {
    try {
        const conn = await mongoose.connect(DB_URI);
        console.log(`Connected to the database in ${NODE_ENV} mode 😉`)
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
		process.exit(1); // process code 1 code means exit with failure, 0 means success
    }
}
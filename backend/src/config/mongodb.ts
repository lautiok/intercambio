import mongoose from "mongoose";
import { config } from "./config";


const mongoURL = config.mongoUri as string;


export default (async() => {
    try {
        await mongoose.connect(mongoURL)
        console.log('Connected to MongoDB')
    } catch (error) {
        console.log('Error connecting to MongoDB', error)
    }
})()
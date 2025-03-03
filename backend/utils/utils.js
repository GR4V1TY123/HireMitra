import mongoose from "mongoose";
import dotenv from "dotenv"
dotenv.config({})

const connectDB = async ()=>{
    try{
        await mongoose.connect(process.env.MONGO_URL)
        console.log("MONGODB CONNECTED")
    }
    catch(e){
        console.log(e)
    }
}

export default connectDB
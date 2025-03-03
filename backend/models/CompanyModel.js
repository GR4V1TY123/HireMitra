import mongoose from "mongoose";
const Schema = mongoose.Schema;

const companySchema = new Schema({
    companyName: {
        type: String,
        required: true
    },
    description: {
        type: String,
        // required: true
    },
    website: {
        type: String,
    },
    location: {
        type: String,
    },
    logo: {
        type: String,
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required:true
    }

}, {timestamps: true})

export const Company = mongoose.model("Company", companySchema)
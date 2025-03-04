import { application } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const applicationSchema = new Schema({
    job: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Job",
        required: true
    },
    applicant: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    status: {
        type: String,
        enum: ["accepted", "rejected", "pending"],
        default: "pending"
    }
}, {timestamps: true})

export const Application = new mongoose.model("Application", applicationSchema)
import { application } from "express";
import mongoose from "mongoose";
const Schema = mongoose.Schema;

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    descriptions: {
        type: String,
        required: true
    },
    requirements: [{
        type: String,
    }],
    salary: {
        type: Number,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    jobType: {
        type: String,
        required: true 
    },
    experienceLevel:{
        type: Number,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    company: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Company",
        required: true 
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    },
    application: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Application",
    }]
}, {timestamps:true})

export const Job = mongoose.model("Job", jobSchema)
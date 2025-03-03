import { Application } from "../models/ApplicationModel.js";
import { Job } from "../models/jobModel.js";

import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const application = async (req, res) => {
    try {
        const userId = req.id
        const jobId = req.params.id
        if (!jobId) {
            return res.status(400).json({
                msg: "job id is requires",
                success: false
            })
        }
        //check if already applied
        const existingApplication = await Application.findOne({ job: jobId, applicant: userId })
        if (existingApplication) {
            return res.status(400).json({
                msg: "You have already applied",
                success: false
            })
        }

        const job = await Job.findById(jobId)
        if (!job) {
            return res.status(404).json({
                msg: "Job not found",
                success: false
            })
        }

        //craete new application
        const newApplication = await Application.create({
            job: jobId,
            applicant: userId
        })

        job.application.push(newApplication._id)
        await job.save()

        res.status(201).json({
            msg: "Application submitted!",
            success: true
        })
    } catch (e) {
        console.log(e);

    }
}

export const getAppliedJobs = async (req, res) => {
    try {
        const userId = req.id
        const applications = await Application.find({ applicant: userId }).sort({ createdAt: -1 }).populate({
            path: "applicant"
        }).populate({
            path: "job",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "company",
                options: { sort: { createdAt: -1 } },
            }
        })
        if (!applications) {
            return res.status(400).json({
                msg: "No applications",
                success: false
            })
        }
        res.status(200).json({
            applications,
            success: true
        })
    }
    catch (e) {
        console.log(e);
    }
}
//for admin to see aplicants for a job
export const getApplicants = async (req, res) => {
    try {
        const jobId = req.params.id
        const job = await Job.findById(jobId).populate({
            path: "application",
            options: { sort: { createdAt: -1 } },
            populate: {
                path: "applicant"
            }
        })
        if (!job) {
            return res.status(400).json({
                msg: "Job not found",
                success: false
            })
        }
        res.status(200).json({
            job,
            success: true
        })
    } catch (e) {
        console.log(e);
    }
}

export const updateStatus = async (req, res) => {
    try {
        const { status } = req.body
        const applicationId = req.params.id
        if (!status) {
            return res.status(400).json({
                msg: "status is required",
                success: false
            })
        }

        const application = await Application.findOne({ _id: applicationId })
        if (!application) {
            return res.status(400).json({
                msg: "application not found",
                success: false
            })
        }
        //update status 
        application.status = status.toLowerCase()
        await application.save()

        res.status(200).json({
            msg: "Status updated successfully",
            success: true
        })
    } catch (e) {
        console.log(e);

    }
}
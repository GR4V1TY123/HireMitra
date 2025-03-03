import { Job } from "../models/jobModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

export const postJob = async (req, res) => {
    try {
        const { title, descriptions, requirements, salary, location, jobType, position, company, experienceLevel } = req.body
        const userId = req.id
        if (!title || !descriptions || !requirements || !salary || !jobType || !location || !position || !company) {
            return res.status(400).json({
                msg: "A field is missing",
                success: false
            })
        }
        const job = await Job.create({
            title,
            descriptions,
            requirements: requirements.split(","),
            salary: Number(salary),
            location,
            jobType,
            position,
            company,
            experienceLevel,
            createdBy: userId
        })
        return res.status(201).json({
            msg: "New job created successfully",
            job,
            success: true
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const getAllJobs = async (req, res) => {
    try {
        const keyword = req.query.keyword || ""
        const query = {
            $or: [
                { title: { $regex: keyword, $options: "i" } },
                { descriptions: { $regex: keyword, $options: "i" } }
            ]
        }
        const jobs = await Job.find(query).populate({
            path: "company"
        }).populate({
            path: "createdBy"
        }).sort({ createdAt: -1 })
        if (!jobs) {
            return res.status(404).json({
                msg: "Jobs not found",
                success: false
            })
        }
        res.status(200).json({
            jobs,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}

export const getJobById = async (req, res) => {
    try {
        const id = req.params.id
        const job = await Job.findById(id).populate({
            path:"application"
        });
        if (!job) {
            return res.status(404).json({
                msg: "Job not found",
                success: false
            })
        }
        res.status(200).json({
            job,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}

export const getAdminJobs = async (req, res) => {
    try {
        const adminId = req.id
        const jobs = await Job.find({ createdBy: adminId }).populate({
            path:"company",
            createdAt: -1
        })
        if (!jobs) {
            return res.status(404).json({
                msg: "Jobs not found",
                success: false
            })
        }
        res.status(200).json({
            jobs,
            success: true
        })
    } catch (e) {
        console.log(e)
    }
}
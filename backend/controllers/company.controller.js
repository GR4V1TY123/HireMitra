import { Company } from "../models/CompanyModel.js";
import mongoose from "mongoose";
import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import getDataUri from "../utils/datauri.js";
import cloudinary from "../utils/cloudinary.js";

// export const registerCompany = async(req,res)=>{
//     try{

//     }
//     catch(e)    {
//         console.log(e)
//     }
// }

export const registerCompany = async (req, res) => {
    try {
        const { companyName } = req.body
        if (!companyName) {
            return res.status(400).json({
                msg: "Company name is required",
                success: false
            })
        }
        let company = await Company.findOne({ companyName: companyName })
        if (company) {
            return res.status(400).json({
                msg: "You cannot register same company",
                success: false
            })
        }
        company = await Company.create({
            companyName: companyName,
            userId: req.id
        })
        res.status(200).json({
            msg: "Company registered",
            company,
            success: true
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const getCompany = async (req, res) => {
    try {
        const userId = req.id
        const companies = await Company.find({ userId })
        if (companies.length === 0) {
            return res.status(400).json({
                msg: "Companies not found",
                success: false
            })
        }
        res.status(200).json({
            companies,
            success:true
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const getCompanyById = async (req, res) => {
    try {
        const companyId = req.params.id
        const company = await Company.findById(companyId)
        if (!company) {
            return res.status(400).json({
                msg: "Company not found",
                success: false
            })
        }
        res.status(200).json({
            company,
            success: true
        })
    }
    catch (e) {
        console.log(e)
    }
}

export const updateCompany = async (req, res) => {
    try {
        const { companyName, description, website, location } = req.body
        const file = req?.file
        const fileUri = getDataUri(file)
        const cloudResponse = await cloudinary.uploader.upload(fileUri.content)
        const logo = cloudResponse.secure_url

        const updateData = { companyName, description, website, location, logo }

        const company = await Company.findByIdAndUpdate(req.params.id, updateData, { new: true })
        if (!company){
            res.status(400).json({
                msg: "Company not found",
                success: false
            })
        }
        res.status(200).json({
            msg: "Company data updated successfully",
            company,
            success: true
        })
    }
    catch (e) {
        console.log(e)
    }
}
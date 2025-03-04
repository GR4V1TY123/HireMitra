import express from "express"
import { getApplicants, getAppliedJobs, updateStatus, application } from "../controllers/application.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"

const router = express.Router()

router.route("/get").get(isAuthenticated,getAppliedJobs)
router.route("/apply/:id").post(isAuthenticated,application)
router.route("/:id/applicants").get(isAuthenticated,getApplicants)
router.route("/status/:id/update").put(isAuthenticated,updateStatus)

export default router
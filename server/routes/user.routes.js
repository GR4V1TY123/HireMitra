import express from "express"
import { register,login,logout,updateProfile } from "../controllers/user.controller.js"
import isAuthenticated from "../middleware/isAuthenticated.js"
import { singleUpload } from "../middleware/multer.js"

const router = express.Router()

router.route("/register").post(singleUpload,register)
router.route("/login").post(login)
router.route("/logout").get(logout)
router.route("/profile/update").patch(isAuthenticated,singleUpload,updateProfile)

export default router
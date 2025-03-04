import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
dotenv.config({})
const app = express();

//routes
import userRoutes from "./routes/user.routes.js"
import companyRoutes from "./routes/company.routes.js"
import jobRoutes from "./routes/job.routes.js"
import applicationRoutes from "./routes/application.route.js"


import connectDB from "./utils/utils.js"

//middleware 
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())
const corsOptions = {
    origin: [
        "http://localhost:5173",  // Allow local development
        "https://hiremitra.onrender.com"
    ],
    credentials: true
};

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;

//apis 
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/jobs", jobRoutes)
app.use("/api/v1/applications", applicationRoutes)




app.get("/home", (req,res)=>{
    res.status(200).json({
        msg:"Welcome boy",
        success:true
    })
})

app.listen(PORT, ()=>{
    connectDB();
    console.log(`Server is Active ${PORT}`)
})
import express from "express"
import cookieParser from "cookie-parser";
import cors from "cors"
import dotenv from "dotenv"
import path from "path";
import { fileURLToPath } from "url";
dotenv.config({})
const app = express();

// Resolving dirname
const __filename= fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
console.log(__dirname);


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
// CORS Configuration

const corsOptions = {
    origin: function (origin, callback) {
        const allowedOrigins = [
            "https://hiremitra.onrender.com",
        ];
        
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error("Not allowed by CORS"));
        }
    },
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"]
};

app.use(cors(corsOptions));



const PORT = process.env.PORT || 3000;

//apis 
app.use("/api/v1/user", userRoutes)
app.use("/api/v1/company", companyRoutes)
app.use("/api/v1/jobs", jobRoutes)
app.use("/api/v1/applications", applicationRoutes)

// Use frontend
app.use(express.static(path.join(__dirname,'/frontend/vite-project/dist')))

// Render client
app.get('*', (req,res)=>{
    res.sendFile(path.join(__dirname,'/frontend/vite-project/dist/index.html'))
})

connectDB();

app.get("/home", (req,res)=>{
    res.status(200).json({
        msg:"Welcome boy",
        success:true
    })
})

app.listen(PORT, ()=>{
    console.log(`Server is Active ${PORT}`)
})
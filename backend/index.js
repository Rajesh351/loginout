import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./utils/db.js";
//import userRoute from "./routes/user.route.js";

import users from "./routes/Userroute.js"

dotenv.config({});

const app = express();

// middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions = {
    origin:`${process.env.host}`,
    credentials:true
}

app.use(cors(corsOptions));

const PORT = process.env.PORT || 3000;


// api's
//app.use("/api/v1/user", userRoute);
app.use("/api/v1/users", users);



app.listen(PORT,()=>{
    connectDB();
    console.log(`Server running at port ${PORT}`);
})
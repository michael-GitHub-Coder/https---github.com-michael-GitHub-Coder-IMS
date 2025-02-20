import express from "express";
import dotenv from "dotenv";
import auth from  "./Routes/auth.routes.js";
import { connectDB } from "./DB/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";


dotenv.config();

const app = express();

app.use(cors({
    origin:"http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    allowedHeaders: "Content-Type,Authorization"
}));

app.use(cookieParser());

app.use(express.json());
app.use("/api/auth", auth)

app.listen(process.env.PORT, () =>{
    connectDB();
    console.log("server running on port :",process.env.PORT)
});







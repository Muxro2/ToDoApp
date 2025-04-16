import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskRouter from "./routers/TaskRouter.js";

dotenv.config();
const PORT = process.env.PORT || 3000;
const MONGODB_URI= process.env.MONGODB_URI

const app = express();
app.use(express.json());
app.use(cors());



app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

mongoose.connect(MONGODB_URI)
.then(
    console.log("> Connected to database")
);

app.use("/tasks", TaskRouter)
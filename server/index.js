import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import TaskModel from "./models/TaskModel.js"

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

app.post("/create", (req, res) => {
    const { task } = req.body;

    TaskModel.create({
        task: task
    })
    .then(result => {
        res.send(result)
        console.log(result)
    });
})

app.post("/delete", (req, res) => {
    const { id } = req.body;

    TaskModel.deleteOne({id: id})
    .then(result => {
        res.send(result)
        console.log(result)
    });
})

app.post("/showall", (req, res) => {
    TaskModel.find()
    .then(result => {
        res.send(result)
        console.log(result)
    });
})
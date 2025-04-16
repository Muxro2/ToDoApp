import express from "express";
import TaskModel from "../models/TaskModel.js";

const router = express.Router();

router.get("/", (req, res) => {
    TaskModel.find({})
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        console.log(err)
    });
});

router.post("/", (req, res) => {
    const { task } = req.body;

    TaskModel.create({
        task: task
    })
    .then(result => {
        res.send(result)
    });
})

router.delete("/", (req, res) => {
    const { id } = req.body;

    TaskModel.deleteOne({id: id})
    .then(result => {
        res.send(result)
    });
})

export default router;
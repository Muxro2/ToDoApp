import express from "express";
import TaskModel from "../models/TaskModel.js";

const router = express.Router();

router.get("/", (req, res) => {
    TaskModel.find({})
    .then(result => {
        res.json(result)
    })
    .catch(err => {
        console.log(err)
    });
});

router.post("/", (req, res) => {
    const { task } = req.body;
    if (task) {
        TaskModel.create({
            task: task
        })
        .then(result => {
            res.send(result)
        });
    }
})

router.delete("/", (req, res) => {
    const { _id } = req.body;

    TaskModel.deleteOne({_id: _id})
    .then(result => {
        res.send(result)
    });
})

export default router;
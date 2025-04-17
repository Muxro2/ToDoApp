import express from "express";
import TaskModel from "../models/TaskModel.js";

const router = express.Router();

router.get("/", (req, res) => {
    TaskModel.find({})
    .then(result => {
        res.send(result)
    })
    .catch(err => {
        res.send(err)
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

router.delete("/:id", (req, res) => {
    const { id } = req.params;

    TaskModel.deleteOne({_id: id})
    .then(result => {
        res.send(result)
    });
})

router.put("/:id", (req, res) => {
    const { id } = req.params;
    TaskModel.findByIdAndUpdate(
        id,
        req.body,
        { new: true }
    )
    .then(result => {
        res.send(result)
    })
})

export default router;
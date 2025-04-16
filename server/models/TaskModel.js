import mongoose from "mongoose";

const { Schema, model} = mongoose;

const taskSchema = new Schema({
    task: String,
    date: {type: Date, default: Date.now},
    completed: {type: Boolean, default: false}
});

const TaskModel = model("Task", taskSchema);
export default TaskModel;

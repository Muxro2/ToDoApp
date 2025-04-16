import { useState, useEffect } from "react";
import TaskBox from "./TaskBox.tsx";
import TaskInput from "./TaskInput.tsx";
import axios from "axios";


interface Task {
    _id: string,
    task: string,
    completed: boolean,
    date: Date

}

export default function Tasks() {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [ taskInput, setTaskInput ] = useState<string>("")

    useEffect(() => {
        axios.get<Task[]>("http://localhost:8080/tasks")
        .then(result => {
            setTasks(result.data)
        })
        .catch(err => console.log(err))    
    }, [tasks])

    return (
        <>
        <TaskInput taskInput={taskInput} setTaskInput={setTaskInput}/>
        <ul>
            {tasks.map(task => {
                return(
                    <li key={task._id}>
                    <TaskBox id={task._id} task={task.task}/>
                    </li>
                )
            })}
        </ul>
        </>
    )
}
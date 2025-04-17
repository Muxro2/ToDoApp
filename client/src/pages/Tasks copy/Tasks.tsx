import { useState, useEffect } from "react";
import TaskBox from "./TaskBox.tsx";
import TaskInput from "./TaskInput.tsx";
import axios from "axios";

const API_URL = "http://localhost:8080/tasks"

interface Task {
    _id: string,
    task: string,
    completed: boolean,
    date: Date

}

export default function Tasks() {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [ taskInput, setTaskInput ] = useState<string>("")
    const [ editing, setEditing ] = useState<string|null>(null)


    // GET all tasks
    useEffect(() => {
        axios.get<Task[]>(API_URL)
        .then(result => {
            console.log("Fetched tasks:", result.data)
            setTasks(result.data)
        })
        .catch(err => console.error(err))    
    }, [])

    function handleClick(task: Task) {
        setEditing(task._id)
        setTaskInput(task.task)
    }

    return (
        <div className="center">
        <TaskInput taskInput={taskInput} setTaskInput={setTaskInput} editing={editing} setEditing={setEditing}/>
        <ul>
            {tasks.map(task => {
                return(
                    <li key={task._id} onClick={e => handleClick(task)}>
                    <TaskBox id={task._id} task={task.task}/>
                    </li>
                )
            })}
        </ul>
        </div>
    )
}
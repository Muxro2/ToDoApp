import { useState, useEffect } from "react";
import TaskBox from "./Tasks.tsx";
import axios from "axios";

const SET_API_URL = () => {
    if (import.meta.env.PROD) {
        return "https://todoapp-2d3a.onrender.com/tasks"
    } else {
        return "http://localhost:8080/tasks"
    }
}
const API_URL = SET_API_URL()


interface Task {
    _id: string,
    task: string,
    completed: boolean,
    date: Date
}

export default function Tasks() {
    const [ tasks, setTasks ] = useState<Task[]>([])
    const [ task, setTask ] = useState<string>("")
    const [ editingTask, setEditingTask ] = useState<string>("")
    const [ editingTaskId, setEditingTaskId ] = useState<string | null>(null)


    // GET all tasks
    useEffect(() => {

        axios.get<Task[]>(API_URL)
        .then(result => {
            setTasks(result.data)
        })
        .catch(err => console.error(err))   

    }, [])

    // Create task
    function createTask() {
        if (!task) return;
        axios.post<Task>(API_URL, { task: task })
        .then(result => {
            setTasks([...tasks, result.data])
            setTask("")
        })
        .catch(err => console.error(err))
    }

    // DELETE task
    function deleteTask(id: string) {
        console.log("Deleting task: ", id)
        axios.delete(API_URL + `/${id}`)
        .then(() => {
            setTasks(tasks.filter(t => t._id !== id))
        })
        .catch(err => console.error(err))
    }

    // Update task
    const updateTask = (id: string, updatedTask: Partial<Task>) => {
        axios.put(API_URL + `/${id}`, updatedTask,  {headers: {"Content-Type": "application/json"}})
        .then(result => {
            setTasks(
                tasks.map((t) => 
                    t._id === id ? {...t, ...result.data} : t
                )
            );
            setEditingTaskId(null)
            setEditingTask("")
        })
        .catch(err => console.log(err))
    }

    function startEditing(id: string) {
        setEditingTaskId(id)
    }

    function handleEditChange(e: React.ChangeEvent<HTMLInputElement>) {
        setEditingTask(e.target.value)
    }


    // Render elements
    return (
        <div className="center">
        <div className="input">
            <input
            type="text" 
            placeholder="Morning run..." 
            onChange={e => setTask(e.target.value)}
            value={task}
            required
            />
            <button type="submit" onClick={createTask}>+</button>
        </div>
        <TaskBox 
        tasks={tasks} 
        deleteTask={deleteTask} 
        updateTask={updateTask} 
        editingTask={editingTask}
        setEditingTask={setEditingTask}
        editingTaskId={editingTaskId}
        setEditingTaskId={setEditingTaskId}
        startEditing={startEditing}
        handleEditChange={handleEditChange}/>
        </div>
    )
}
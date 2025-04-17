import axios from 'axios';
import './TaskInput.tsx';
import './style.scss'

export default function TaskInput({taskInput, setTaskInput, editing, setEditing}: {taskInput:string, setTaskInput: React.Dispatch<React.SetStateAction<string>>, editing: string|null, setEditing: React.Dispatch<React.SetStateAction<string|null>>}) {


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        if (editing) {
            axios.put("http://localhost:8080/tasks", {task: taskInput, _id: editing})
            console.log("edited")
            setEditing(null)
            setTaskInput("")
        } else {
            axios.post("http://localhost:8080/tasks", {task: taskInput})
            .then(() => {
                setTaskInput("")
            })
        }
    }

    return (
        <form className="input" onSubmit={e => handleSubmit(e)}>
            <input
            type="text" 
            placeholder="Scrub the chicken..." 
            onChange={e => setTaskInput(e.target.value)}
            value={taskInput}
            required
            />
            <button type="submit">
                {editing ? "x" : "+"}
            </button>
        </form>
    )
};
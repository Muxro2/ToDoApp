import axios from 'axios';
import './TaskInput.tsx';
import './style.scss'

export default function TaskInput({taskInput, setTaskInput}: {taskInput:string, setTaskInput: React.Dispatch<React.SetStateAction<string>>}) {


    function handleSubmit(e: React.FormEvent) {
        e.preventDefault();
        axios.post("http://localhost:8080/tasks", {task: taskInput})
        .then(result => {
            console.log(result)
            setTaskInput("")
        })
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
            <button type="submit">+</button>
        </form>
    )
};
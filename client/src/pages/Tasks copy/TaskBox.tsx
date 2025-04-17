import axios from 'axios';
import './TaskBox.tsx';
import './style.scss'

export default function TaskBox({task, id}: {task: string, id: string}) {

    function handleClick(e: React.MouseEvent) {
        e.stopPropagation();
        console.log(id)
        axios.delete("http://localhost:8080/tasks", { data: {_id: id}})
    }

    return (
        <div className="task-box">
            <p>{task}</p>
            <button onClick={e => handleClick(e)}>x</button>
        </div>
    )
};
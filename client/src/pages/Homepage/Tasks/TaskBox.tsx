import axios from 'axios';
import './TaskBox.tsx';
import './style.scss'

export default function TaskBox({task, id}: {task: string, id: string}) {

    function handleClick() {
        console.log(id)
        axios.delete("http://localhost:8080/tasks", { data: {_id: id}})
        .then(result => {
            console.log(result)
        })
    }

    return (
        <div className="task-box">
            <p>{task}</p>
            <button onClick={() => handleClick()}>x</button>
        </div>
    )
};
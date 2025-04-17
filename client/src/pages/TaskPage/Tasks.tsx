import React from 'react';
import './Tasks.tsx';
import './style.scss'

interface Task {
    _id: string,
    task: string,
    completed: boolean,
    date: Date
}

interface TasksProps {
    tasks: Task[],
    deleteTask: (id: string) => void,
    updateTask: (id: string, updatedTask: Partial<Task>) => void,
    editingTask: string,
    setEditingTask: (task: string) => void,
    editingTaskId: string | null,
    setEditingTaskId: (id: string | null) => void,
    startEditing: (id: string) => void,
    handleEditChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

export default function TaskBox({
    tasks,
    deleteTask,
    updateTask,
    editingTask,
    setEditingTask,
    editingTaskId,
    setEditingTaskId,
    startEditing,
    handleEditChange
}: TasksProps) {

    return (
        <ul>
            {tasks.map(task => {
                return (
                    <li key={task._id} className={task.completed ?  "checked task-box" : "task-box"} onClick={(e) => {
                        startEditing(task._id)
                        setEditingTask(task.task)
                    }}>

                        <input 
                        type="checkbox" 
                        onClick={e => e.stopPropagation()}
                        checked={task.completed}
                        onChange={() => updateTask(task._id, { completed: !task.completed})}/>

                        {editingTaskId === task._id ? (
                            <>
                                <input type="text" value={editingTask} onChange={handleEditChange} autoFocus/>
                                <button className="modify" onClick={e => {
                                    e.stopPropagation()
                                    updateTask(task._id, { task: editingTask })
                                    setEditingTaskId(null)
                                }}>→</button>
                            </>
                        ) : (
                            <>
                                <p>{task.task}</p>
                                <button className="modify" onClick={e => {
                                    e.stopPropagation()
                                    deleteTask(task._id)
                                }}>x</button>
                            </>
                        )}
                    </li>
                )
            })}
        </ul>
    )
};
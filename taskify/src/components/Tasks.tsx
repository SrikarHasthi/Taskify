import React from "react";
import "../components/Tasks.scss"
import medium from "../assets/medium.svg"
import play from "../assets/play.svg"
import pause from "../assets/pause.svg"
import stop from "../assets/stop.svg"
import { TaskData } from "../Interfaces";

interface Props {
    setTaskData: React.Dispatch<React.SetStateAction<TaskData[]>>,
    taskData: TaskData[],
    status: string[]
}

const Tasks = ({taskData, setTaskData, status}: Props) => {

    const handleStatus = (task: TaskData, status:string):void => {
        let newStatus = ""
        if(status === "done"){
            newStatus = "done"
        }
        else {
            newStatus = task.status === "new" || task.status === "paused" ? "inProgress" : "paused";
        }
        const newTaskData:TaskData[] = taskData.map((e)=>{
            if(e.id === task.id) {
                e.status = newStatus
                return e
            }
            return e
        })
        setTaskData(newTaskData)
    }
    return (
        <div className="tasks-main-container">
            {taskData.filter((e)=> status.includes(e.status)).map((task)=>{
                return (
                    <div className="tasks-section-container">
                    <div className="tasks-section-summary">
                        Testing a summary
                    </div>
                    <div className="task-section-bottom">
                        <div className="task-section-bottom-time-conatiner">
                            <div className="task-section-bottom-time">30:00</div>
                            {
                                task.status !== "done" ?
                                <img className="task-section-bottom-icon" src={(task.status === "new" || task.status === "paused") ? play : pause} onClick={()=> handleStatus(task, "notDone")} alt="play/pause icon"/>
                                : ""
                            }
                            {
                                (task.status === "inProgress" || task.status === "paused") ? 
                                <img className="task-section-bottom-icon" src={stop} onClick={()=> handleStatus(task, "done")} alt="stop icon"/> 
                                : "" 
                            }
                        </div>
                        <img className="task-section-bottom-priority" src={medium} alt="priority icon"/>
                    </div>
                </div>
                )
            })}

        </div>
    )
}

export default Tasks;
import React, { useState } from "react";
import "../components/Tasks.scss"
import play from "../assets/play.svg"
import pause from "../assets/pause.svg"
import stop from "../assets/stop.svg"
import { TaskData } from "../Interfaces";
import Modal from 'react-modal';
import { convertTime, givePriorityImage } from "../Utils";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { customStyles } from "../StaticData";
import AddTaskPopup from "./AddTaskPopup";
import { setTaskData } from "../redux/reducers/taskDataReducer";
import CountdownTimer from "./CountdownTimer";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface Props {
    status: string[]
}

const Tasks = ({status}: Props) => {
    const allTaskData = useSelector((state: RootState) => state.taskData)
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false)
    const [selectedTaskId, setSelectedTaskId] = useState<number>()
    const dispatch = useDispatch()
    const handleStatus = (task: TaskData, status:string, e:React.MouseEvent<HTMLImageElement, MouseEvent>):void => {
        e.stopPropagation()
        setSelectedTaskId(task.id)
        let newStatus = ""
        let localStorageTime = task.time
        if(status === "done"){
            localStorage.removeItem(`${task.id}`)
            newStatus = "done"
        }
        else {
            if(task.status === "new" || task.status === "paused"){
                localStorage.setItem(`${task.id}`, `${task.time}`)
                newStatus = "inProgress"
            }
            if(task.status === "inProgress"){
                localStorageTime = getLocalStorageTime(task.id)
                newStatus = "paused"
            }
            // newStatus = task.status === "new" || task.status === "paused" ? "inProgress" : "paused";
        }
        const newTaskData:TaskData[] = allTaskData.map((e)=>{
            if(e.id === task.id) {
                return {
                    ...e,
                    time: localStorageTime,
                    status: newStatus
                }
            }
            return e
        })
        dispatch(setTaskData(newTaskData))
    }
    const getLocalStorageTime = (id: number | undefined): number => {
        const storedValue = localStorage.getItem(`${id}`); 
        return storedValue !== null ? parseInt(storedValue) : 0;
    };

    const checkTimeForDone = (id: number | undefined) => {
        let task: TaskData | null = null;

        const newTaskData: TaskData[] = allTaskData.map((e) => {
            if (e.id === id) {
                task = e;
                return {
                    ...e,
                    status: "done"
                };
            }
            return e;
        });
        
        if (task !== null) {
            new Notification(`Task ${(task as TaskData).summary} is completed`)
        }
        localStorage.removeItem(`${id}`)
        dispatch(setTaskData(newTaskData))
    }
      
    return (
        <div className="tasks-main-container">

            {allTaskData.filter((e)=> status.includes(e.status)).map((task, id)=>{
                return (
                    <div className="tasks-section-container" key={id} onClick={()=> {
                        setSelectedTaskId(task.id);
                        setAddTaskPopup(true)
                    }}>
                      {selectedTaskId === task.id ? <Modal
                            isOpen={addTaskPopup}
                            style={{
                                ...customStyles,
                                content:{
                                ...customStyles.content,
                                width: "41rem",
                                height: "28rem",
                            }}}
                            shouldCloseOnOverlayClick={true}
                            onRequestClose={(e) => {
                                e.stopPropagation()
                                setAddTaskPopup(false);
                            }}
                            >
                                <AddTaskPopup setAddTaskPopup={setAddTaskPopup} taskData={[task]}/>
                        </Modal> : ""}
                    <div className="tasks-section-summary">
                        {task.summary}
                    </div>
                    <div className="task-section-bottom">
                        <div className="task-section-bottom-time-conatiner">
                            
                            <div className="task-section-bottom-time">
                                {
                                    (task.status === "inProgress") ? <CountdownTimer targetTime={new Date().getTime() + getLocalStorageTime(task.id)} taskId={task.id} checkTimeForDone={checkTimeForDone}/>
                                    : convertTime(task.time).toDisplayTime()
                                }
                            </div>
                            
                            {
                                task.status !== "done" ?
                                <img className="task-section-bottom-icon" src={(task.status === "new" || task.status === "paused") ? play : pause} onClick={(e)=> handleStatus(task, "notDone", e)} alt="play/pause icon"/>
                                : ""
                            }
                            {
                                (task.status === "inProgress" || task.status === "paused") ? 
                                <img className="task-section-bottom-icon" src={stop} onClick={(e)=> handleStatus(task, "done", e)} alt="stop icon"/> 
                                : "" 
                            }
                        </div>
                        <img className="task-section-bottom-priority" src={givePriorityImage(task.priority)} alt="priority icon"/>
                    </div>
                </div>
                )
            })}
            <ToastContainer 
                position="bottom-right"
                hideProgressBar={true}
            />
        </div>
    )
}

export default Tasks;
import React, { useState, useRef, useEffect } from "react";
import closeIcon from "../assets/close-icon.svg"
import "../components/AddTaskPopup.scss"
import dropDownArrow from "../assets/dropdown-arrow-svgrepo-com.svg"
import CustomDropdown from "./CustomDropdown";
import { priorityImages } from "../StaticData";
import { capitalizeFirstLetter } from "../Utils";
import { useOutsideAlerter } from "../hooks";
import { TaskData, priorityInterface } from "../Interfaces";

interface Props {
    setAddTaskPopup: React.Dispatch<React.SetStateAction<boolean>>,
    setTaskData: React.Dispatch<React.SetStateAction<TaskData[]>>,
    taskData: TaskData[],
}

const AddTaskPopup = ({setAddTaskPopup, setTaskData, taskData}: Props) => {
    const [priorityValue, setPriorityValue] = useState<priorityInterface>(priorityImages[1])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [summary, setSummary] = useState<string>("")
    const [description, setDiscription] = useState<string>("")
    const [priority, setPriority] = useState<string>("")
    const [time, setTime] = useState<string>("")
    const dropdownRef = useRef(null)
    useOutsideAlerter(dropdownRef, ()=>{
        setShowDropdown(false)
    })

    useEffect(()=>{
        console.log(summary, time, priority);
        
    },[summary, time, priority])
    const changeDropdown = (data: priorityInterface):void =>{
        setPriorityValue(data)
        setShowDropdown(false)
    }
    const handleSubmit = ():void => {
        setTaskData([...taskData, {
            id: Date.now(),
            summary: summary,
            description: description,
            priority: priority,
            time: time,
            status: "new",
        }])
        setAddTaskPopup(false)
    }

    return (
        <div>
            <div className="task-popup-heading-container">
                <div>New Task</div>
                <img src={closeIcon} className="task-popup-close-icon" onClick={(e)=>(setAddTaskPopup(false))} alt="close icon"/>
            </div>
            <div className="task-popup-fields-container">
                <div className="task-popup-heading">Summary</div>
                <input className="task-popup-addTask-input" onChange={(e)=>{setSummary(e.target.value)}}></input>
                <div className="task-popup-heading">Description</div>
                <textarea className="task-popup-addTask-input task-popup-addTask-input-textbox" onChange={(e)=>{setDiscription(e.target.value)}}></textarea>
                <div className="task-popup-heading">Priority</div>
                <div className="task-popup-dropdown" onClick={()=>{setShowDropdown(true)}}>
                <div  className="task-popup-dropdown-value-container">
                            <img src={priorityValue.imgSrc} style={{height:"68%"}} alt="priority icon"/>
                            <span style={{paddingLeft:"0.6rem"}}>{capitalizeFirstLetter(priorityValue.value)}</span>
                        </div>
                    <img src={dropDownArrow}  className="task-popup-dropdown-arrow" alt="down icon"/>
                    {showDropdown ? <div className="task-popup-dropdown-outer-container" ref={dropdownRef}>
                        <CustomDropdown changeDropdown={changeDropdown} setPriority={setPriority}/>
                    </div> : ""}      
                </div>
                <div className="task-popup-heading">Set Time</div>
                <input className="task-popup-addTask-input task-popup-addTask-time-input" placeholder="1d 4h 30m" onChange={(e)=>{setTime(e.target.value)}}/>
                <button className="task-popup-createTask-button" onClick={()=> handleSubmit()}>Create</button>
            </div>
        </div>
    )
}

export default AddTaskPopup;
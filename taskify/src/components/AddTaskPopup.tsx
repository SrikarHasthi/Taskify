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
}

const AddTaskPopup = ({setAddTaskPopup}: Props) => {
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

    return (
        <div>
            <div className="task-popup-heading-container">
                <div>New Task</div>
                <img src={closeIcon} className="task-popup-close-icon" onClick={()=>setAddTaskPopup(false)}/>
            </div>
            <div className="task-popup-fields-container">
                <div className="task-popup-heading">Summary</div>
                <input className="task-popup-addTask-input" onChange={(e)=>{setSummary(e.target.value)}}></input>
                <div className="task-popup-heading">Description</div>
                <textarea className="task-popup-addTask-input task-popup-addTask-input-textbox" onChange={(e)=>{setDiscription(e.target.value)}}></textarea>
                <div className="task-popup-heading">Priority</div>
                <div className="task-popup-dropdown" onClick={()=>{setShowDropdown(true)}}>
                <div  className="task-popup-dropdown-value-container">
                            <img src={priorityValue.imgSrc} style={{height:"68%"}}/>
                            <span style={{paddingLeft:"0.6rem"}}>{capitalizeFirstLetter(priorityValue.value)}</span>
                        </div>
                    <img src={dropDownArrow}  className="task-popup-dropdown-arrow"/>
                    {showDropdown ? <div className="task-popup-dropdown-outer-container" ref={dropdownRef}>
                        <CustomDropdown changeDropdown={changeDropdown} setPriority={setPriority}/>
                    </div> : ""}      
                </div>
                <div className="task-popup-heading">Set Time</div>
                <input className="task-popup-addTask-input task-popup-addTask-time-input" placeholder="1d 4h 30m" onChange={(e)=>{setTime(e.target.value)}}/>
            </div>
        </div>
    )
}

export default AddTaskPopup;
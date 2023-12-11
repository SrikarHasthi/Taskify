import React, { useState, useRef } from "react";
import closeIcon from "../assets/close-icon.svg"
import "../components/AddTaskPopup.scss"
import dropDownArrow from "../assets/dropdown-arrow-svgrepo-com.svg"
import CustomDropdown from "./CustomDropdown";
import { priorityImages } from "../StaticData";
import { capitalizeFirstLetter, givePriorityImage } from "../Utils";
import { useOutsideAlerter } from "../hooks";
import { TaskData, priorityInterface } from "../Interfaces";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../redux/store";
import { setTaskData } from "../redux/reducers/taskDataReducer";

interface Props {
    setAddTaskPopup: React.Dispatch<React.SetStateAction<boolean>>,
    taskData?: TaskData[],
}

const AddTaskPopup = ({setAddTaskPopup, taskData}: Props) => {
    const allTaskData = useSelector((state: RootState) => state.taskData)
    const [priorityValue, setPriorityValue] = useState<priorityInterface>(priorityImages[1])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [summary, setSummary] = useState<string>((taskData && taskData[0]) ? taskData[0].summary : "")
    const [description, setDescription] = useState<string>((taskData && taskData[0]) ? taskData[0].description : "")
    const [priority, setPriority] = useState<string>((taskData && taskData[0]) ? capitalizeFirstLetter(taskData[0].priority) : capitalizeFirstLetter(priorityImages[1].value))
    const [time, setTime] = useState<string>((taskData && taskData[0]) ? taskData[0].time : "")
    const dispatch = useDispatch()
    const dropdownRef = useRef(null)
    useOutsideAlerter(dropdownRef, ()=>{
        setShowDropdown(false)
    })
    const changeDropdown = (data: priorityInterface):void =>{
        setPriority(data.value)
        setPriorityValue(data)
        setShowDropdown(false)
    }
    const handleSubmit = ():void => {
        if(summary === "" || description === "" || time === ""){
            toast.error("Field is empty")
        }
        else if((taskData && taskData[0])){
            const updatedTaskData = allTaskData.map((e)=>{
                if(e.id === taskData[0].id){
                    return {
                        ...e,
                        description: description,
                        summary: summary,
                        priority: priorityValue.value,
                        time: time,
                    }
                }
                return e
            })
            dispatch(setTaskData(updatedTaskData))
            setAddTaskPopup(false)
        }
        else{
            dispatch(setTaskData([...allTaskData, {
                id: Date.now(),
                summary: summary,
                description: description,
                priority: priority,
                time: time,
                status: "new",
            }]))
            setAddTaskPopup(false)
        }  
    }


    return (
        <div>
            <div className="task-popup-heading-container">
                <div>New Task</div>
                <img src={closeIcon} className="task-popup-close-icon" onClick={(e)=> {e.stopPropagation(); setAddTaskPopup(false)}} alt="close icon"/>
            </div>
            <div className="task-popup-fields-container">
                <div className="task-popup-heading">Summary</div>
                <input className="task-popup-addTask-input" value={summary} onChange={(e)=>{setSummary(e.target.value)}}></input>
                <div className="task-popup-heading">Description</div>
                <textarea className="task-popup-addTask-input task-popup-addTask-input-textbox" value={description} onChange={(e)=>{setDescription(e.target.value)}}></textarea>
                <div className="task-popup-heading">Priority</div>
                <div className="task-popup-dropdown" onClick={()=>{setShowDropdown(true)}}>
                <div  className="task-popup-dropdown-value-container">
                            <img src={givePriorityImage(priority)} style={{height:"68%"}} alt="priority icon"/>
                            <span style={{paddingLeft:"0.6rem"}}>{capitalizeFirstLetter(priority)}</span>
                        </div>
                    <img src={dropDownArrow}  className="task-popup-dropdown-arrow" alt="down icon"/>
                    {showDropdown ? <div className="task-popup-dropdown-outer-container" ref={dropdownRef}>
                        <CustomDropdown changeDropdown={changeDropdown} setPriority={setPriority}/>
                    </div> : ""}      
                </div>
                <div className="task-popup-heading">Set Time</div>
                <input className="task-popup-addTask-input task-popup-addTask-time-input" placeholder="1d 4h 30m" value={time} onChange={(e)=>{setTime(e.target.value)}}/>
                <button className="task-popup-createTask-button" onClick={(e)=> {e.stopPropagation(); handleSubmit()}}>{(taskData && taskData[0]) ? "Done" : "Create"}</button>
            </div>
            <ToastContainer 
                position="bottom-right"
                hideProgressBar={true}
            />
        </div>
    )
}

export default AddTaskPopup;
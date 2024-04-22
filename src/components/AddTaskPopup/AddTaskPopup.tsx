import React, { useState, useRef } from "react";
import closeIcon from "../../assets/close-icon.svg"
import "./AddTaskPopup.scss"
import dropDownArrow from "../../assets/dropdown-arrow-svgrepo-com.svg"
import CustomDropdown from "./CustomDropdown";
import { priorityImages } from "../../StaticData";
import { capitalizeFirstLetter, convertTime, givePriorityImage, validateTime } from "../../Utils";
import { useOutsideAlerter } from "../../hooks";
import { PayloadTaskData, TaskData, priorityInterface } from "../../Interfaces";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { setTaskData } from "../../redux/reducers/taskDataReducer";
import { createTodo, deleteTodo, updateTodos } from "../../api/apis";
import { useAuth } from "../../AuthContext";

interface Props {
    setAddTaskPopup: React.Dispatch<React.SetStateAction<boolean>>,
    taskData?: TaskData[],
}

const AddTaskPopup = ({ setAddTaskPopup, taskData }: Props) => {
    const allTaskData = useSelector((state: RootState) => state.taskData)
    const [priorityValue, setPriorityValue] = useState<priorityInterface>(priorityImages[1])
    const [showDropdown, setShowDropdown] = useState<boolean>(false)
    const [summary, setSummary] = useState<string>((taskData && taskData[0]) ? taskData[0].summary : "")
    const [description, setDescription] = useState<string>((taskData && taskData[0]) ? taskData[0].description : "")
    const [priority, setPriority] = useState<string>((taskData && taskData[0]) ? capitalizeFirstLetter(taskData[0].priority) : capitalizeFirstLetter(priorityImages[1].value))
    const [time, setTime] = useState<string>((taskData && taskData[0]) ? convertTime(taskData[0].time).toAlphaNumericTime : "")
    const dispatch = useDispatch()
    const authContext = useAuth()
    const userDetails = authContext.userData
    const dropdownRef = useRef(null)
    useOutsideAlerter(dropdownRef, () => {
        setShowDropdown(false)
    })
    const changeDropdown = (data: priorityInterface): void => {
        setPriority(data.value)
        setPriorityValue(data)
        setShowDropdown(false)
    }
    const handleSubmit = (): void => {
        if (summary === "" || time === "") {
            toast.error("Field is empty")
        }
        else if (!validateTime(time)) {
            toast.error("Enter time in format 1h 5m")
        }
        else if ((taskData && taskData[0])) {
            let updatedTask = {
                ...taskData[0],
                description: description,
                summary: summary,
                priority: priorityValue.value,
                time: convertTime(time).toMs(),
            }

            updateTodos(taskData[0].id, userDetails.userId, updatedTask).then((res) => {
                if (res && res.data) {
                    updatedTask = res.data;
                }
            })
            const updatedTaskData = allTaskData.map((e) => {
                if (e.id === taskData[0].id) {
                    return updatedTask;
                }
                return e
            })
            dispatch(setTaskData(updatedTaskData))
            setAddTaskPopup(false)
        }
        else {
            let task: PayloadTaskData = {
                dateCreated: Date.now().toString(),
                summary: summary,
                description: description,
                priority: priority,
                time: convertTime(time).toMs(),
                status: "new",
            };
            createTodo(task, userDetails.userId).then((res) => {
                if (res && res.data) {
                    const newtask: TaskData = { ...task, id: res.data.id };
                    dispatch(setTaskData([...allTaskData, newtask]))

                }
            })
            setAddTaskPopup(false)
        }
    }

    const handleDelete = (id: number) => {

        deleteTodo(id).then((res) => {
            if (res && res.data) {

            }
        })
        const updatedTaskData = allTaskData.filter((e) => {
            if (e.id !== id) {
                return e
            }
            else {
                localStorage.removeItem(`${e.id}`)
            }
        })
        dispatch(setTaskData(updatedTaskData))
        setAddTaskPopup(false)
    }


    return (
        <div>
            <div className="task-popup-heading-container">
                <div>New Task</div>
                <img src={closeIcon} className="task-popup-close-icon" onClick={(e) => { e.stopPropagation(); setAddTaskPopup(false) }} alt="close icon" />
            </div>
            <div className="task-popup-fields-container">
                <div className="task-popup-heading">Summary</div>
                <input className="task-popup-addTask-input" value={summary} onChange={(e) => { setSummary(e.target.value) }}></input>
                <div className="task-popup-heading">Description</div>
                <textarea className="task-popup-addTask-input task-popup-addTask-input-textbox" value={description} onChange={(e) => { setDescription(e.target.value) }}></textarea>
                <div className="task-popup-heading">Priority</div>
                <div className="task-popup-dropdown" onClick={() => { setShowDropdown(true) }}>
                    <div className="task-popup-dropdown-value-container">
                        <img src={givePriorityImage(priority)} style={{ height: "68%" }} alt="priority icon" />
                        <span style={{ paddingLeft: "0.6rem" }}>{capitalizeFirstLetter(priority)}</span>
                    </div>
                    <img src={dropDownArrow} className="task-popup-dropdown-arrow" alt="down icon" />
                    {showDropdown ? <div className="task-popup-dropdown-outer-container" ref={dropdownRef}>
                        <CustomDropdown changeDropdown={changeDropdown} setPriority={setPriority} />
                    </div> : ""}
                </div>
                <div className="task-popup-heading">Set Time</div>
                <input className="task-popup-addTask-input task-popup-addTask-time-input" placeholder=" 4h 30m" value={time} onChange={(e) => { setTime(e.target.value) }} />
                <button className="task-popup-createTask-button" onClick={(e) => { e.stopPropagation(); handleSubmit() }}>{(taskData && taskData[0]) ? "Done" : "Create"}</button>
                {
                    (taskData && taskData[0]) ? <button className="task-popup-createTask-button" onClick={(e) => { e.stopPropagation(); handleDelete(taskData[0].id) }}>Delete</button>
                        : ""
                }

            </div>
            <ToastContainer
                position="bottom-right"
                hideProgressBar={true}
            />
        </div>
    )
}

export default AddTaskPopup;
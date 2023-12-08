import React, { useEffect, useState } from "react"
import Modal from 'react-modal';
import './App.css';
import AddTaskPopup from './components/AddTaskPopup';
import { customStyles } from './StaticData';
import { TaskData } from "./Interfaces";
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";



const Home: React.FC = () =>{
    const [taskData, setTaskData] = useState<TaskData[]>([])
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false)
    useEffect(()=>{
        console.log(taskData)
    },[taskData])
    return(
        <div className="home-main-container">
            <Header/>
            <hr style={{width: "99%"}}/>
            <div className="home-main-sub-container">
                <Sidebar/>
                <div className="home-main-tasks-container">
                    <div className="home-main-add-task-button" onClick={()=>setAddTaskPopup(true)}>Add Task</div>
                    <Modal
                        isOpen={addTaskPopup}
                        style={{
                            ...customStyles,
                            content:{
                            ...customStyles.content,
                            width: "41rem",
                            height: "28rem",
                        }}}
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={() => {
                            setAddTaskPopup(false);
                        }}
                        >
                            <AddTaskPopup setAddTaskPopup={setAddTaskPopup} setTaskData={setTaskData} taskData={taskData}/>
                    </Modal>
                    <div className="home-main-tasks-sub-conatiner">
                        <Tasks taskData={taskData} setTaskData={setTaskData} status={["new"]}/>
                        <Tasks taskData={taskData} setTaskData={setTaskData} status={["inProgress", "paused"]}/>
                        <Tasks taskData={taskData} setTaskData={setTaskData} status={["done"]}/>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default Home;
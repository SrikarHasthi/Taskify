import React, { useState } from "react"
import Modal, { Styles } from 'react-modal';
import './App.css';
import AddTaskPopup from './components/AddTaskPopup';
import { customStyles } from './StaticData';
import { TaskData } from "./Interfaces";



const Home: React.FC = () =>{
    const [taskData, setTaskData] = useState<TaskData[]>([])
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false)
    return(
        <div>
            <div onClick={()=>setAddTaskPopup(true)}>Add Task</div>
                <Modal
                    isOpen={addTaskPopup}
                    style={{
                        ...customStyles,
                        content:{
                        ...customStyles.content,
                        width: "41rem",
                        height: "24rem",
                    }}}
                    shouldCloseOnOverlayClick={true}
                    onRequestClose={() => {
                        setAddTaskPopup(false);
                    }}
                    >
                        <AddTaskPopup setAddTaskPopup={setAddTaskPopup} setTaskData={setTaskData}/>
                    </Modal>
        </div>
    )
}

export default Home;
import React, { useEffect, useState } from "react"
import Modal from 'react-modal';
import './App.css';
import AddTaskPopup from './components/AddTaskPopup';
import { customStyles } from './StaticData';
import Header from "./components/Header";
import Sidebar from "./components/Sidebar";
import Tasks from "./components/Tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "./redux/store";
import { setTaskData } from "./redux/reducers/taskDataReducer";

const Home: React.FC = () =>{
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false)
    const dispatch = useDispatch()
    const allTaskData = useSelector((state: RootState) => state.taskData)
    useEffect(()=>{
        if(localStorage.getItem(`allTaskData`)){
            const storedTaskdata = localStorage.getItem(`allTaskData`)
            if(storedTaskdata != null){
                dispatch(setTaskData(JSON.parse(storedTaskdata)))
            }
        }
    },[])

    useEffect(()=>{
        const timeout = setTimeout(() => { 
            localStorage.setItem(`allTaskData`, `${JSON.stringify(allTaskData)}`)
          }, 500); 
       
          return () => clearTimeout(timeout); 
    },[allTaskData])
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
                            <AddTaskPopup setAddTaskPopup={setAddTaskPopup}/>
                    </Modal>
                    <div className="home-main-tasks-sub-conatiner">
                        <Tasks status={["new"]}/>
                        <Tasks status={["inProgress", "paused"]}/>
                        <Tasks status={["done"]}/>
                    </div>
                    </div>
                </div>
            </div>
    )
}

export default Home;
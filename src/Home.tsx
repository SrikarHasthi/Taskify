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
import { retrieveTodos, updateTodos } from "./api/apis";
import { useAuth } from "./AuthContext";

import empty from './assets/empty.png';

const Home: React.FC = () => {
    const [addTaskPopup, setAddTaskPopup] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const dispatch = useDispatch()
    const allTaskData = useSelector((state: RootState) => state.taskData)
    const authContext = useAuth();

    useEffect(()=>{
        updateTodos().then((res)=>{
            if(res && res.data)
            console.log(res);
        })
        retrieveTodos().then((res)=>{
            if(res && res.data)
            console.log(res.data);
        })
    },[])

    useEffect(()=>{
        const currentDate = new Date();
        const formattedDate = currentDate.toLocaleDateString();
        if (localStorage.getItem('expToken')) {
            const expToken = localStorage.getItem('expToken')
            if (expToken === formattedDate) {
                if (localStorage.getItem(`allTaskData`)) {
                    const storedTaskdata = localStorage.getItem(`allTaskData`)
                    if (storedTaskdata != null) {
                        dispatch(setTaskData(JSON.parse(storedTaskdata)))
                    }
                }
            }
            else {
                if (localStorage.getItem(`allTaskData`)) {
                    localStorage.removeItem(`allTaskData`)
                    localStorage.setItem(`expToken`, formattedDate)
                }
            }
        }
        else {
            localStorage.setItem(`expToken`, formattedDate)
        }
        if (!("Notification" in window)) {
            console.log("Browser does not support desktop notification");
        } else {
            Notification.requestPermission();
        }
        setIsLoading(true);

    }, [])

    useEffect(() => {
        const timeout = setTimeout(() => {
            localStorage.setItem(`allTaskData`, `${JSON.stringify(allTaskData)}`)
        }, 500);
        return () => clearTimeout(timeout);
    }, [allTaskData])


    return (
        <div className="home-main-container">
            <Header />
            {/* <hr style={{width: "99%"}}/> */}
            <div style={{ width: "100%", background: "rgb(0 0 0 / 17%)", height: "2px" }}></div>
            <div className="home-main-sub-container">
                <Sidebar />
                <div className="home-main-tasks-container">
                    <div className="home-main-add-task-button" onClick={() => setAddTaskPopup(true)}>Add Task</div>
                    <Modal
                        isOpen={addTaskPopup}
                        style={{
                            ...customStyles,
                            content: {
                                ...customStyles.content,
                                width: (window.innerWidth >= 960) ? "41rem" : "90%",
                                inset: (window.innerWidth >= 960) ? "40px" : "0px",
                                height: "28rem",
                            }
                        }}
                        shouldCloseOnOverlayClick={true}
                        onRequestClose={() => {
                            setAddTaskPopup(false);
                        }}
                    >
                        <AddTaskPopup setAddTaskPopup={setAddTaskPopup} />
                    </Modal>
                    {
                        isLoading ?
                            allTaskData.length > 0 ?
                                <div className="home-main-tasks-sub-conatiner">
                                    <div className="home-main-tasks-task-container">
                                        <div className="home-main-tasks-heading">TO DO</div>
                                        <Tasks status={["new"]} />
                                    </div>
                                    <div className="home-main-tasks-task-container">
                                        <div className="home-main-tasks-heading">IN PROGRESS</div>
                                        <Tasks status={["inProgress", "paused"]} />
                                    </div>
                                    <div className="home-main-tasks-task-container">
                                        <div className="home-main-tasks-heading .gg-3">DONE</div>
                                        <Tasks status={["done"]} />
                                    </div>
                                </div>
                                :
                                <div className="home-main-no-tasks-container">
                                    <div className="home-main-no-tasks-sub-container">
                                        <img src={empty} alt="empty"/>
                                        ADD A TASK TO GET STARTED
                                    </div>
                                </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    )
}

export default Home;
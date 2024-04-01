import React from "react";
import { useDispatch } from "react-redux";
import { setTaskData } from "../redux/reducers/taskDataReducer";
import { savedTasks } from "../StaticData";
import comingSoon from "../assets/coming-soon.svg";
import question from "../assets/question-circle-svgrepo-com.svg";
import "./Sidebar.scss"
import { Tooltip } from "react-tooltip";

const Sidebar = () => {
    const dispatch = useDispatch()
    const handleLoad = () => {
        const tasks = savedTasks();
        dispatch(setTaskData(tasks))
    }

    return (
        <>
            <div className="main-sidebar-container">
                <div className="main-sidebar-coming-soon">
                    <div className="main-sidebar-coming-soon-img">
                        <img src={comingSoon} alt="coming soon"/>
                    </div>
                    <p className="main-sidebar-text">New Features</p>
                    <p className="main-sidebar-text">Coming Soon!!
                        <span  data-tooltip-id={"coming-soon-tooltip"}>
                            <img src={question} alt="question"/>
                        </span>
                        <Tooltip id="coming-soon-tooltip" data-tooltip-place="right-start" style={{width:"13rem", background:"black"}}>
                            Backend with Java Spring Boot with Login, Profile, Tasks History, Favourite tasks and many more..
                            Stay Tuned
                        </Tooltip>
                    </p>

                </div>
                <div className="sidebar-load-tasks-section" onClick={() => handleLoad()}></div>
            </div>
            <div style={{ width: "3px", background: "rgb(0 0 0 / 17%)", height: "100%" }}></div>
        </>
    )
}

export default Sidebar;
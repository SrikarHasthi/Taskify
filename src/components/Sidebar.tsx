import React from "react";
import { useDispatch } from "react-redux";
import { setTaskData } from "../redux/reducers/taskDataReducer";
import { savedTasks } from "../StaticData";

const Sidebar = () => {
    const dispatch = useDispatch()
    const handleLoad = () => {
        const tasks = savedTasks();
        dispatch(setTaskData(tasks))
    }

    return (
        <>
            <div className="main-sidebar-container">
                <div className="sidebar-load-tasks-section" onClick={() => handleLoad()}></div>
            </div>
            <div style={{ width: "3px", background: "rgb(0 0 0 / 17%)", height: "100%" }}></div>
        </>
    )
}

export default Sidebar;
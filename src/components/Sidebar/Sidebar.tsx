import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setTaskData } from "../../redux/reducers/taskDataReducer";
import { savedTasks } from "../../StaticData";
import comingSoon from "../../assets/coming-soon.svg";
import question from "../../assets/question-circle-svgrepo-com.svg";
import "./Sidebar.scss"
import { Tooltip } from "react-tooltip";
import { allTasksHistory } from "../../Interfaces";
import { convertTime } from "../../Utils";
import downArrow from '../../assets/down-arrow-svgrepo-com.svg';
import sideArrow from '../../assets/side-arrow-svgrepo-com.svg';

interface Props {
    allTasksHistory: allTasksHistory[] | null,

}

const Sidebar = ({ allTasksHistory }: Props) => {
    const dispatch = useDispatch()
    const [filteredAllTasksHistory, setFilteredAllTaskHistory] = useState<allTasksHistory[] | null>(null)
    const [openTaskHistoryIds, setOpenTaskHistoryIds] = useState<
        Record<number, boolean>
    >({});


    useEffect(() => {
        const filteredData = allTasksHistory && allTasksHistory.filter((e) => {
            return e.todos.length > 0;
        });
        setFilteredAllTaskHistory(filteredData);

    }, [allTasksHistory])

    const handleTasksHistoryOpening = (taskHistoryId: number) => {
        setOpenTaskHistoryIds((prevOpenTaskHistoryIds) => ({
            ...prevOpenTaskHistoryIds,
            [taskHistoryId]: !prevOpenTaskHistoryIds[taskHistoryId],
        }));
    };


    const handleLoad = () => {
        const tasks = savedTasks();
        dispatch(setTaskData(tasks))
        console.log(allTasksHistory);

    }



    return (
        <>
            <div className="main-sidebar-container">
                {/* <div className="sidebar-load-tasks-section" onClick={() => handleLoad()}></div> */}
                <div className="sidebar-tasks-history-container">
                    <div className="sidebar-tasks-history-title">
                        Tasks History
                    </div>
                    {
                        filteredAllTasksHistory?.map((taskHistory, id) => {
                            return (
                                <div className="sidebar-tasks-history-tasks-container" key={id}>
                                    <div className="sidebar-tasks-history-tasks-date" onClick={() => { handleTasksHistoryOpening(id) }}>
                                        <div className="sidebar-tasks-history-tasks-date-image">
                                            <img src={openTaskHistoryIds[id] ? downArrow : sideArrow} alt="arrow" />
                                        </div>
                                        <div>Date : {taskHistory.dateCreated}</div>
                                    </div>
                                    <div className="sidebar-tasks-hitory-collapse" style={{ maxHeight: `${openTaskHistoryIds[id] ? "100rem" : "0"}`}}>
                                        {
                                            openTaskHistoryIds[id] && taskHistory.todos.map((task, id) => {
                                                return (
                                                    <div className="sidebar-tasks-history-tasks" key={id}>
                                                        <div><i>Id: </i>{task.id}</div>
                                                        <div><i>Summary: </i>{task.summary}</div>
                                                        <div><i>Description: </i>{task.description}</div>
                                                        <div><i>Priority: </i>{task.priority}</div>
                                                        <div><i>Status: </i>{task.status}</div>
                                                        <div><i>Time Left: </i>{convertTime(task.time).toDisplayTime()}</div>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>
                                </div>
                            )
                        })
                    }
                </div>
                <div className="main-sidebar-coming-soon">
                    <div className="main-sidebar-coming-soon-img">
                        <img src={comingSoon} alt="coming soon" />
                    </div>
                    <p className="main-sidebar-text">New Features</p>
                    <p className="main-sidebar-text">Coming Soon!!
                        <span data-tooltip-id={"coming-soon-tooltip"}>
                            <img src={question} alt="question" />
                        </span>
                        <Tooltip id="coming-soon-tooltip" data-tooltip-place="right-start" style={{ width: "13rem", background: "black" }}>
                            Backend with Java Spring Boot with Login, Profile, Tasks History, Favourite tasks and many more..
                            Stay Tuned
                        </Tooltip>
                    </p>

                </div>
            </div>
            <div style={{ width: "3px", background: "rgb(0 0 0 / 17%)", height: "100%" }}></div>
        </>
    )
}

export default Sidebar;
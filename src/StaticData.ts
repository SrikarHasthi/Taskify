import { CustomModalStyles, TaskData } from "./Interfaces";
import { convertTime } from "./Utils";


export const customStyles: CustomModalStyles = {
  overlay: {
    zIndex: 999,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.6)",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    margin: "auto",
    background: "#282E33",
    overflow: "auto",
    WebkitOverflowScrolling: "touch",
    borderRadius: "8px",
    outline: "none",
    padding: 0,
    border: "none",
  },
};

export const priorityImages = 
[
  {
    value: "low",
    imgSrc: "https://srikarhasthi.atlassian.net/images/icons/priorities/low.svg",
  },
  {
    value: "medium",
    imgSrc: "https://srikarhasthi.atlassian.net/images/icons/priorities/medium.svg",
  },
  {
    value: "high",
    imgSrc: "https://srikarhasthi.atlassian.net/images/icons/priorities/high.svg",
  },
  
]

export const savedTasks = ():TaskData[] => {
 return [
    {
      id: Date.now(),
      summary: "Learn Backend",
      description: "",
      priority: "medium",
      time: convertTime("1h").toMs(),
      status: "new",
    },
    {
      id: Date.now()+100,
      summary: "Leetcode",
      description: "",
      priority: "medium",
      time: convertTime("1h").toMs(),
      status: "new",
    },
  ]
}
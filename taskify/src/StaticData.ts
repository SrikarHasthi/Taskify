import { CustomModalStyles } from "./Interfaces";


export const customStyles: CustomModalStyles = {
  overlay: {
    zIndex: 999,
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "#0000009e",
  },
  content: {
    position: "absolute",
    top: "40px",
    left: "40px",
    right: "40px",
    bottom: "40px",
    margin: "auto",
    background: "#fff",
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
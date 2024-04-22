import React, {useState} from "react";
import "./CustomDropdown.scss"
import { priorityImages } from "../../StaticData";
import { capitalizeFirstLetter } from "../../Utils";
import { priorityInterface } from "../../Interfaces";

interface Props {
    changeDropdown: (data: priorityInterface) => void,
    setPriority: React.Dispatch<React.SetStateAction<string>>,
}

const CustomDropdown = ({changeDropdown, setPriority}: Props) => {
    const [priorityList] = useState<priorityInterface[]>(priorityImages)
    return (
        <div className="customDropdown-container">
            {
                priorityList.map((data, index)=>{
                    
                    return(
                        <div  className="customDropdown-value-container" key={index} onClick={(e)=> {
                            e.stopPropagation()
                            setPriority(data.value)
                            changeDropdown(data)
                        }}>
                            <img style={{height:"68%"}} src={data.imgSrc} alt={data.value}/>
                            <span  style={{paddingLeft:"0.6rem"}}>{capitalizeFirstLetter(data.value)}</span>
                        </div>
                    )
                })
            }
          
        </div>
    )
}

export default CustomDropdown;
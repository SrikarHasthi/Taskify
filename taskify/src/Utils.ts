import { priorityImages } from "./StaticData";

export const capitalizeFirstLetter = (value: string): string => {
    return value.charAt(0).toUpperCase() + value.slice(1);
}

export const convertTime = (value: string): string =>{
    let time = ""
    let hour = null
    let minutes = 0
    if (value.includes('h')){
        hour = value.split('h')
        minutes = parseInt(hour[0]) * 60
        if(value.includes('m')){
            minutes = minutes + parseInt(hour[1].split('m')[0]) 
        }
        time = new Date(minutes * 60 * 1000).toISOString().substring(11, 19)
    }
    else if (value.includes('m')){
        minutes = parseInt(value.split('m')[0])
        time = new Date(minutes * 60 * 1000).toISOString().substring(14, 19);
    }
    return time
}

export const givePriorityImage = (priority:string):string =>{
    
    const tempArray = priorityImages.filter((e)=>{
        return e.value === priority.toLowerCase()
    })
    return tempArray[0].imgSrc
    
}
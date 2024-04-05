import React, { useEffect } from "react";
import { useCountdown } from "../hooks";
import { useDispatch } from "react-redux";

interface Props {
  targetTime: number,
  taskId: number,
  checkTimeForDone: (id: number) => void,
}

const CountdownTimer = ({ targetTime, taskId, checkTimeForDone }: Props) => {
  const {countDown, hours, minutes, seconds} = useCountdown(targetTime);
  const dispatch = useDispatch()
  useEffect(() => {
    localStorage.setItem(`${taskId}`, `${countDown}`)
    if(countDown <= 0) {
      checkTimeForDone(taskId)
    }
  }, [countDown, hours, minutes, seconds]);


  return (
    <>
    {
    (hours <= 0)?
        (minutes + seconds <= 0) ?
        <p onLoad={()=>{
          
          // dispatch(setTaskPopup(true))}
        }}>00:00</p>
        :
            <div>{minutes} : {seconds}</div>
            :
      (hours + minutes + seconds <= 0) ?
        <p>00:00:00</p> :
          <div>{hours} : {minutes} : {seconds}</div>
    }
    </>
  )
  
}

export default CountdownTimer;
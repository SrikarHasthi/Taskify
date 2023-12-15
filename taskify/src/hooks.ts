import { useState, RefObject, useEffect } from "react";

export const useOutsideAlerter = (ref: RefObject<HTMLElement>, clickOutside?:(event: MouseEvent) => void) => {
    useEffect(() => {
      function handleClickOutside(event: MouseEvent): void {
        if (ref.current && !ref.current.contains(event.target as Node)) {
          clickOutside && clickOutside(event);
        }
      }
  
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }, [ref, clickOutside]);
};

export const useCountdown = (targetTime: number) => {
  const countDownDate = new Date(targetTime).getTime();
  
  const [countDown, setCountDown] = useState(
    countDownDate - new Date().getTime()
  );

  useEffect(() => {
    const interval = setInterval(() => {
      setCountDown(countDownDate - new Date().getTime());
    }, 1000);

    return () => clearInterval(interval);
  }, [countDownDate]);

  return {countDown, ...getReturnValues(countDown)};
};

const getReturnValues = (countDown: number) => {
  // calculate time left
  const hours = Math.floor(
    (countDown % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
  );
  const minutes = Math.floor((countDown % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((countDown % (1000 * 60)) / 1000);

  return {hours, minutes, seconds};
};


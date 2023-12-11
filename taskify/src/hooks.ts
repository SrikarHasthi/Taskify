import { RefObject, useEffect } from "react";

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


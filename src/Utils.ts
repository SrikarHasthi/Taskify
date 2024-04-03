import { TimeConverter } from "./Interfaces";
import { priorityImages } from "./StaticData";

export const capitalizeFirstLetter = (value: string): string => {
  return value.charAt(0).toUpperCase() + value.slice(1);
};

export const convertTime = (value: number | string): TimeConverter => {
  const toDisplayTime = () => {
    let time = "";
    time = new Date(value).toISOString().substring(11, 19);
    // } else if (value.includes('m')) {
    //   minutes = parseInt(value.split('m')[0]);
    //   time = new Date(minutes * 60 * 1000).toISOString().substring(14, 19);
    // }

    return time;
  };

  const toAlphaNumericTime = () => {
    let time = "";
    time = new Date(value).toISOString().substring(11, 19);
    let timeArray = time.split(":");
    if (timeArray[0] !== "00") {
      time = timeArray[0] + "h " + timeArray[1] + "m";
    } else {
      time = timeArray[1] + "m";
    }
    return time;
  };

  const toMs = () => {
    let minutes = 0;
    let time = 0;
    let hour: string[] | null = null;
    if (typeof value === "string") {
      if (value.includes("h")) {
        hour = value.split("h");
        minutes = parseInt(hour[0]) * 60;

        if (value.includes("m")) {
          minutes += parseInt(hour[1].split("m")[0]);
        }

        time = minutes * 60 * 1000;
      } else if (value.includes("m")) {
        minutes = parseInt(value.split("m")[0]);
        time = minutes * 60 * 1000;
      }
    }

    return time;
  };

  return {
    toDisplayTime,
    toAlphaNumericTime,
    toMs,
  };
};

export const givePriorityImage = (priority: string): string => {
  const tempArray = priorityImages.filter((e) => {
    return e.value === priority.toLowerCase();
  });
  return tempArray[0].imgSrc;
};

export const validateTime = (time: string): boolean => {
  const regex = /^(\d+h)? ?(\d+m)?$/;

  if (!regex.test(time)) {
    return false;
  }
  const matchResult = time.match(regex);
  if (matchResult) {
    console.log(matchResult);
    
    const [_, hours, minutes] = matchResult;

    if (!hours && !minutes) {
      return false;
    }

    if (hours) {
      const hoursValue = parseInt(hours);
      if (isNaN(hoursValue) || hoursValue < 0) {
        return false;
      }
    }

    if (minutes) {
      const minutesValue = parseInt(minutes);
      if (isNaN(minutesValue) || minutesValue < 0 || minutesValue >= 60) {
        return false;
      }
    }

    return true;
  } else {
    return false;
  }
};

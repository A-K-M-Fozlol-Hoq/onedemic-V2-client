import React, { useState, useEffect } from "react";

const DateTimeDisplay = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000); // Update every second

    return () => {
      clearInterval(timer);
    };
  }, []);

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  const formattedDate = currentTime.toLocaleDateString(undefined, options);
  const formattedTime = currentTime.toLocaleTimeString(undefined, {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return (
    <div className="flex flex-col items-center justify-center mt-5">
      <div className="text-4xl font-bold">{formattedTime}</div>
      <div className="text-xl mt-2">{formattedDate}</div>
      <div className="text-2xl mt-2">
        {currentTime.toLocaleDateString(undefined, { weekday: "long" })}
      </div>
    </div>
  );
};

export default DateTimeDisplay;

'use client';

import { useState, useEffect } from "react";
import { useRouter } from "next/router"; // For getting the subject from the query

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const router = useRouter();
  const { subject } = router.query;  // Get the subject from the URL

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }
    return () => {
      if (timer) {
        clearInterval(timer);
      }
    };
  }, [isRunning]);

  const stopTimer = () => {
    setIsRunning(false);

    // Get previous records
    const existingRecords = JSON.parse(localStorage.getItem("timerRecords") || "[]");

    // New record
    const newRecord = {
      subject: subject || "Unknown",
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString(),
      duration: `${time}s`,
    };

    // Save updated records to localStorage
    const updatedRecords = [...existingRecords, newRecord];
    localStorage.setItem("timerRecords", JSON.stringify(updatedRecords));

    // Redirect back to main page after stopping the timer
    router.push("/");
  };

  // Start the timer automatically when the component mounts
  useEffect(() => {
    setIsRunning(true);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl">{subject}</h2>
      <div className="text-3xl mt-4">{time}s</div>

      <button onClick={stopTimer} className="mt-4 bg-red-500 text-white py-2 px-4 rounded">
        Stop Timer
      </button>
    </div>
  );
};

export default TimerPage;
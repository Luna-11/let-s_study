"use client"; // Ensure this runs on the client side

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => clearInterval(timer);
  }, [isRunning]);

  const stopTimer = () => {
    setIsRunning(false);

    // Get previous records
    const existingRecords = JSON.parse(localStorage.getItem("timeRecords") || "[]");

    // New record
    const newRecord = {
      subject: subject || "Unknown",
      time,
      date: new Date().toLocaleString(),
    };

    // Save updated records to localStorage
    const updatedRecords = [...existingRecords, newRecord];
    localStorage.setItem("timeRecords", JSON.stringify(updatedRecords));

    console.log("Saved Records:", updatedRecords); // Debugging log

    // Redirect AFTER saving (short delay to ensure localStorage updates)
    setTimeout(() => {
      window.location.href = "/";
    }, 500); // 500ms delay
  };

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h2 className="text-xl">{subject || "Loading..."}</h2>
        <div className="text-3xl mt-4">{time}s</div>
        <div className="mt-4">
          <button
            onClick={stopTimer}
            className="bg-red-500 text-white py-2 px-4 rounded"
          >
            Stop Timer
          </button>
        </div>
      </div>
    </Suspense>
  );
};

export default TimerPage;

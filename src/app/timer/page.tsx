"use client";  // Ensure this is a client-side component

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject");

  // Timer logic
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

    // Save to local storage
    const records = JSON.parse(localStorage.getItem("timeRecords") || "[]");
    const newRecord = {
      subject,
      time: time,
      date: new Date().toLocaleString(),
    };
    records.push(newRecord);
    localStorage.setItem("timeRecords", JSON.stringify(records));

    // Redirect to main page
    window.location.href = "/";
  };

  if (!subject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl">{subject}</h2>
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
  );
};

// Wrapping in Suspense to avoid Next.js error
export default function TimerWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <TimerPage />
    </Suspense>
  );
}

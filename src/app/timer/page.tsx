'use client';  // Ensure this is a client-side component

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";  // Import useSearchParams

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);  // Start the timer immediately on load
  const searchParams = useSearchParams();  // Access the query params
  const subject = searchParams.get("subject");  // Get the subject from URL query params

  // Timer logic: start and stop based on `isRunning`
  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isRunning) {
      // Start the timer when isRunning is true
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1); // Increment the time by 1 second
      }, 1000);
    } else {
      // Clear the timer when it's not running
      clearInterval(timer);
    }

    // Clean up the timer on component unmount
    return () => clearInterval(timer);
  }, [isRunning]);  // Re-run effect whenever isRunning changes

  const stopTimer = () => {
    setIsRunning(false);  // Stop the timer
    window.location.href = "/";  // Navigate back to the main page
  };

  if (!subject) {
    return <div>Loading...</div>;  // Show a loading message until the subject is available
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl">{subject}</h2>  {/* Display the current subject */}
      <div className="text-3xl mt-4">{time}s</div>  {/* Display the timer */}
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

export default TimerPage;

'use client';

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";

const TimerPage = () => {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(true);
  const searchParams = useSearchParams();
  const router = useRouter();
  const subject = searchParams.get("subject");

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isRunning) {
      timer = setInterval(() => {
        setTime((prevTime) => prevTime + 1);
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isRunning]);

  const stopTimer = () => {
    setIsRunning(false);

    if (subject) {
      const now = new Date();
      const record = {
        subject,
        date: now.toLocaleDateString(),
        time: now.toLocaleTimeString(),
        duration: `${Math.floor(time / 60)}m ${time % 60}s`,
      };

      // Retrieve existing records and update them
      const storedRecords = JSON.parse(localStorage.getItem("timerRecords") || "[]");
      storedRecords.push(record);
      localStorage.setItem("timerRecords", JSON.stringify(storedRecords));
    }

    // Redirect back to the main page after stopping
    router.push("/");
  };

  if (!subject) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <h2 className="text-xl">{subject}</h2>
      <div className="text-3xl mt-4">{Math.floor(time / 60)}m {time % 60}s</div>
      <div className="mt-4">
        <button onClick={stopTimer} className="bg-red-500 text-white py-2 px-4 rounded">
          Stop Timer
        </button>
      </div>
    </div>
  );
};

export default TimerPage;

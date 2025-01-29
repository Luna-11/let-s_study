// app/components/timer.tsx

'use client';

import { useState, useEffect, useRef } from "react";

export default function Timer() {
    const [time, setTime] = useState(0);
    const [isRunning, setIsRunning] = useState(false);
    const timerRef = useRef(null);

    useEffect(() => {
        if (typeof window !== "undefined") {
            if (isRunning) {
                timerRef.current = setInterval(() => {
                    setTime((prevTime) => prevTime + 1);
                }, 1000);
            } else {
                if (timerRef.current) {
                    clearInterval(timerRef.current);
                }
            }
        }

        return () => {
            if (timerRef.current) {
                clearInterval(timerRef.current);
            }
        };
    }, [isRunning]);

    const startTimer = () => setIsRunning(true);
    const stopTimer = () => setIsRunning(false);

    return (
        <div className="flex flex-col items-center p-4 border rounded-lg shadow-md w-64">
            <h2 className="text-xl font-semibold mb-2">Timer</h2>
            <p className="text-2xl font-bold mb-4">{time} sec</p>
            <div className="flex space-x-4">
                <button
                    onClick={startTimer}
                    disabled={isRunning}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                >
                    Start
                </button>
                <button
                    onClick={stopTimer}
                    disabled={!isRunning}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                >
                    Stop
                </button>
            </div>
        </div>
    );
}

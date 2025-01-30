"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function MainPage() {
  const [records, setRecords] = useState<{ subject: string; time: number; date: string }[]>([]);

  useEffect(() => {
    const storedRecords = JSON.parse(localStorage.getItem("timeRecords") || "[]");
    setRecords(storedRecords);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-3xl font-bold mb-4">Welcome to the Timer App</h1>
      
      {/* Your original main page content */}
      <p className="mb-4">Start tracking your time for different tasks.</p>
      <Link href="/timer">
        <button className="bg-blue-500 text-white py-2 px-4 rounded">Start Timer</button>
      </Link>

      {/* Time Records Table */}
      <h2 className="text-2xl font-bold mt-8">Recorded Timings</h2>
      {records.length === 0 ? (
        <p className="mt-4">No records found.</p>
      ) : (
        <table className="mt-4 border-collapse border border-gray-400 w-full max-w-lg">
          <thead>
            <tr className="bg-gray-200">
              <th className="border border-gray-400 px-4 py-2">Subject</th>
              <th className="border border-gray-400 px-4 py-2">Time (s)</th>
              <th className="border border-gray-400 px-4 py-2">Date</th>
            </tr>
          </thead>
          <tbody>
            {records.map((record, index) => (
              <tr key={index}>
                <td className="border border-gray-400 px-4 py-2">{record.subject}</td>
                <td className="border border-gray-400 px-4 py-2">{record.time}s</td>
                <td className="border border-gray-400 px-4 py-2">{record.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

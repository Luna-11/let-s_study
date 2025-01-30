'use client';

import { useState, useEffect } from "react";
import Link from "next/link";

export default function Home() {
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState("");
  const [records, setRecords] = useState<{ subject: string; date: string; time: string; duration: string }[]>([]);

  useEffect(() => {
    // Load timer records from local storage
    const storedRecords = JSON.parse(localStorage.getItem("timerRecords") || "[]");
    setRecords(storedRecords);

    // Load subjects from local storage
    const storedSubjects = JSON.parse(localStorage.getItem("subjects") || "[]");
    setSubjects(storedSubjects);
  }, []);

  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      const updatedSubjects = [...subjects, newSubject];

      // Save subjects in local storage
      localStorage.setItem("subjects", JSON.stringify(updatedSubjects));
      setSubjects(updatedSubjects);
      setNewSubject("");
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h2>Study With Me</h2>

        {/* Input for adding a new subject */}
        <div className="flex gap-4 items-center">
          <input
            type="text"
            value={newSubject}
            onChange={(e) => setNewSubject(e.target.value)}
            placeholder="Add a new subject"
            className="border p-2 rounded"
          />
          <button onClick={handleAddSubject} className="bg-blue-500 text-white py-2 px-4 rounded">
            Add Subject
          </button>
        </div>

        {/* List of subjects with links to the timer page */}
        <div className="flex flex-col gap-4 mt-4">
          {subjects.map((subject, index) => (
            <Link key={index} href={`/timer?subject=${subject}`} className="text-blue-500 hover:underline">
              {subject}
            </Link>
          ))}
        </div>

        {/* Timer Records Table */}
        <h3 className="mt-8 text-lg font-bold">Timer Records</h3>
        {records.length > 0 ? (
          <table className="border-collapse border border-gray-300 mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="border border-gray-300 px-4 py-2">Subject</th>
                <th className="border border-gray-300 px-4 py-2">Date</th>
                <th className="border border-gray-300 px-4 py-2">Time</th>
                <th className="border border-gray-300 px-4 py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {records.map((record, index) => (
                <tr key={index} className="text-center">
                  <td className="border border-gray-300 px-4 py-2">{record.subject}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.date}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.time}</td>
                  <td className="border border-gray-300 px-4 py-2">{record.duration}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500 mt-2">No timer records available.</p>
        )}
      </main>
    </div>
  );
}

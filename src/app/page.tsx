'use client';  // Ensure this is a client-side component

import { useState } from "react";
import Link from "next/link";

export default function Home() {
  const [subjects, setSubjects] = useState<string[]>([]);  // State to store user-created subjects
  const [newSubject, setNewSubject] = useState("");  // State for the new subject input

  // Function to handle adding a new subject
  const handleAddSubject = () => {
    if (newSubject.trim() !== "") {
      setSubjects([...subjects, newSubject]);
      setNewSubject("");  // Clear the input field after adding
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
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
          <button
            onClick={handleAddSubject}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            Add Subject
          </button>
        </div>

        {/* List of subjects with links to the timer page */}
        <div className="flex flex-col gap-4 mt-4">
          {subjects.map((subject) => (
            <Link
              key={subject}
              href={`/timer?subject=${subject}`}
              className="text-blue-500 hover:underline"
            >
              {subject}
            </Link>
          ))}
        </div>
      </main>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [message, setMessage] = useState<string>("Loading...");

  useEffect(() => {
    fetch("http://localhost:5000")
      .then((res) => res.text())
      .then((data) => setMessage(data))
      .catch((err) => {
        console.error(err);
        setMessage("Error connecting to backend");
      });
  }, []);

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">GitHub Analyzer</h1>
      <p className="mt-4">Backend says: {message}</p>
    </main>
  );
}
"use client";

import { useState } from "react";

export default function Home() {
  const [url, setUrl] = useState("");
  const [repoData, setRepoData] = useState<any>(null);

  const isValidGitHubUrl = (url: string) => {
  return url.startsWith("https://github.com/");
  };

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchRepo = async () => {
  setError("");
  setRepoData(null);

  if (!isValidGitHubUrl(url)) {
    setError("Please enter a valid GitHub repository URL");
    return;
  }

  try {
    setLoading(true);

    const res = await fetch(
      `http://localhost:5000/repo?url=${url}`
    );

    if (!res.ok) {
      throw new Error("Repository not found");
    }

    const data = await res.json();
    setRepoData(data);
  } catch (err) {
    setError("Failed to fetch repository data");
  } finally {
    setLoading(false);
  }
};

  return (
    <main className="p-10">
      <h1 className="text-2xl font-bold">GitHub Analyzer</h1>

      <div className="mt-6">
        <input
          type="text"
          placeholder="Enter GitHub repo URL"
          className="border p-2 mr-2"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <button
  onClick={fetchRepo}
  className="bg-blue-500 text-white px-4 py-2"
  disabled={loading}
>
  {loading ? "Analyzing..." : "Analyze"}
</button>
      </div>
      {loading && <p className="mt-4">⏳ Loading...</p>}

{error && (
  <p className="mt-4 text-red-500">
    ❌ {error}
  </p>
)}

      {repoData && (
  <div className="mt-6">
    <h2 className="text-xl font-semibold">
      {repoData.name}
    </h2>
    <p>{repoData.description}</p>
    <p>⭐ Stars: {repoData.stars}</p>
    <p>🍴 Forks: {repoData.forks}</p>
    <p>🐛 Issues: {repoData.issues}</p>
    <p>🧠 Language: {repoData.language}</p>
  </div>
)}
    </main>
  );
}
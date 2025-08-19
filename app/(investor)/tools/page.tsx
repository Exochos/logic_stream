"use client";

import { useEffect, useState } from "react";

export default function TeslaPage() {
  const [data, setData] = useState<any>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await fetch("/api/mongo/");
      const json = await res.json();
      setData(json);
    }
    fetchData();
  }, []);

  if (!data) return <p>Loading…</p>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tesla 10-Q</h1>
      <pre className="bg-black text-white p-4 rounded-lg overflow-x-auto">
        {/* Format JSON for better readability */}
        <code className="whitespace-pre-wrap break-words">    

        {JSON.stringify(data, null, 2)}
        {/* Display the fetched data in a readable format */}
        </code>
      </pre>
    </div>
  );
}

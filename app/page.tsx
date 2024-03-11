"use client";

import { ChangeEvent, useState } from "react";

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [parsedData, setParsedData] = useState("");

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    setParsedData("");
    const file = e.target.files?.[0];

    if (
      file?.name.toLocaleLowerCase().endsWith(".pdf")
      // || file?.name.toLocaleLowerCase().endsWith(".docx")
    ) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = async () => {
        const base64 = reader.result?.toString().split(",")[1];

        if (!base64) return;
        setIsLoading(true);
        const res = await fetch("/api/resume/parse", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ file: base64 }),
        });
        setIsLoading(false);

        const data = await res.json();

        setParsedData(JSON.stringify(data, null, 2));
      };
    } else {
      setParsedData("");
      alert("Only pdf file formats are supported!");
    }
  };

  return (
    <div>
      <div className="max-w-screen-md mx-auto my-10">
        <h1 className="text-2xl font-semibold my-2">
          Resume parser using LangChainAI
        </h1>

        <div>
          <label
            className="block mb-2 text-sm font-medium text-gray-900"
            htmlFor="file_input"
          >
            Upload file
          </label>
          <input
            type="file"
            accept=".pdf"
            onChange={(e) => handleFileChange(e)}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none"
            id="file_input"
          />
        </div>
      </div>

      {isLoading ? <p>Loading...</p> : <pre>{parsedData}</pre>}
    </div>
  );
}

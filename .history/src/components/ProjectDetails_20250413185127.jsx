import React from "react";
import { useParams } from "react-router-dom";

export default function ProjectDetails() {
  const { id } = useParams();

  return (
    <div className="relative bg-gradient-to-br from-purple-200 to-purple-500 min-h-[90vh] rounded-xl overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-20 z-0"></div>

      <div className="relative z-10 p-6 text-white space-y-4">
        <h1 className="text-3xl font-bold">Project #{id}</h1>
        <p className="text-lg">Listen to your generated track and download it.</p>

        <div className="bg-white rounded-xl p-4 text-black shadow w-full max-w-lg">
          <div className="flex justify-between items-center">
            <div className="flex items-center gap-3">
              <button className="w-10 h-10 rounded-full bg-purple-500 text-white text-xl">►</button>
              <span className="text-sm">00:01</span>
              <div className="h-2 w-40 bg-purple-200 rounded-full mx-2"></div>
              <span className="text-sm">01:01</span>
            </div>
            <button className="bg-purple-500 text-white px-4 py-2 rounded shadow">Download</button>
          </div>
        </div>
      </div>
    </div>
  );
}

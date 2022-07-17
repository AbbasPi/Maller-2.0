import React from "react";

function Loading() {
  return (
    <div className="flex items-center fixed top-0 bottom-0 right-0 left-0 justify-center space-x-2 animate-pulse transform transition duration-75">
      <div className="w-8 h-8 bg-cyan-500 rounded-full" />
      <div className="w-8 h-8 bg-cyan-500 rounded-full" />
      <div className="w-8 h-8 bg-cyan-500 rounded-full" />
    </div>
  );
}

export default Loading;

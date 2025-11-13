import React from "react";
import { FaSpinner } from "react-icons/fa";

const LoadingSpinner = ({ fullScreen = false }) => {
  // Renders a full-screen overlay spinner
  if (fullScreen) {
    return (
      <div className="fixed inset-0 z-[999] flex h-screen w-full items-center justify-center bg-white bg-opacity-70 dark:bg-gray-900 dark:bg-opacity-70">
        <div className="flex flex-col items-center">
          <FaSpinner className="h-10 w-10 animate-spin text-blue-600" />
          <span className="mt-3 text-sm font-medium text-gray-700 dark:text-gray-300">
            Loading...
          </span>
        </div>
      </div>
    );
  }

  // Renders a smaller, inline spinner
  return (
    <div className="flex w-full items-center justify-center py-10">
      <FaSpinner className="h-8 w-8 animate-spin text-blue-600" />
    </div>
  );
};

export default LoadingSpinner;

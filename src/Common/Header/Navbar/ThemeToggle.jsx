import React, { useState, useEffect } from "react";
import { FiSun, FiMoon } from "react-icons/fi";

const ThemeToggle = () => {
  // Initialize state from localStorage or default to 'light'
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme : "light";
  });

  // Effect to apply the theme class to <html> and save to localStorage
  useEffect(() => {
    const root = window.document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Toggle function
  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <button
      onClick={handleThemeSwitch}
      className="p-2 text-gray-600 rounded-full dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
      aria-label="Toggle dark mode"
    >
      {theme === "dark" ? (
        <FiSun className="w-6 h-6" />
      ) : (
        <FiMoon className="w-6 h-6" />
      )}
    </button>
  );
};

export default ThemeToggle;

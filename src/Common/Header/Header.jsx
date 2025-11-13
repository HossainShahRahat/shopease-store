import React from "react";
import Navbar from "./Navbar/Navbar";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full bg-white shadow-sm dark:bg-gray-900">
      {/* We can add a top bar here later if needed, e.g., for promotions */}

      <Navbar />
    </header>
  );
};

export default Header;

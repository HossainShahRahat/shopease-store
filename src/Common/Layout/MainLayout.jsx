import React from "react";
import { Outlet } from "react-router-dom";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import { Toaster } from "react-hot-toast";

const MainLayout = () => {
  return (
    <div>
      {/* Global toast container for notifications */}
      <Toaster position="top-right" reverseOrder={false} />

      <Header />

      {/* Page content is injected here */}
      <main className="min-h-[calc(100vh-400px)]">
        {" "}
        {/* Adjust 400px based on header/footer height */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};

export default MainLayout;

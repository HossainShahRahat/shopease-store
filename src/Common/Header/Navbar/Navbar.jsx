import React, { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { FiShoppingCart, FiUser, FiMenu, FiX } from "react-icons/fi";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Placeholders for auth and cart context
  const user = null;
  const cartItemCount = 0;
  const isAdmin = false;

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const commonLinkClasses = "py-2 px-3 rounded-md text-sm font-medium";
  const activeLinkClasses =
    "bg-gray-900 text-white dark:bg-gray-100 dark:text-gray-900";
  const inactiveLinkClasses =
    "text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700";

  // Navigation links for reuse in desktop and mobile
  const navLinks = (
    <>
      <li>
        <NavLink
          to="/"
          className={({ isActive }) =>
            `${commonLinkClasses} ${
              isActive ? activeLinkClasses : inactiveLinkClasses
            }`
          }
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink
          to="/products"
          className={({ isActive }) =>
            `${commonLinkClasses} ${
              isActive ? activeLinkClasses : inactiveLinkClasses
            }`
          }
        >
          Shop
        </NavLink>
      </li>

      {/* User-specific links */}
      {user && (
        <li>
          <NavLink
            to="/dashboard/my-orders"
            className={({ isActive }) =>
              `${commonLinkClasses} ${
                isActive ? activeLinkClasses : inactiveLinkClasses
              }`
            }
          >
            My Orders
          </NavLink>
        </li>
      )}

      {/* Admin-specific links */}
      {user && isAdmin && (
        <li>
          <NavLink
            to="/dashboard/admin"
            className={({ isActive }) =>
              `${commonLinkClasses} ${
                isActive ? activeLinkClasses : inactiveLinkClasses
              }`
            }
          >
            Admin Panel
          </NavLink>
        </li>
      )}
    </>
  );

  return (
    <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <div className="flex-shrink-0">
          <Link
            to="/"
            className="text-2xl font-bold text-gray-900 dark:text-white"
          >
            ShopEase
          </Link>
        </div>

        {/* Desktop Navigation */}
        <div className="hidden lg:flex lg:items-center lg:ml-10">
          <ul className="flex space-x-4">{navLinks}</ul>
        </div>

        {/* Icons & Auth Section */}
        <div className="flex items-center space-x-3">
          <ThemeToggle />

          <Link
            to="/cart"
            className="relative p-2 text-gray-600 rounded-full dark:text-gray-300 hover:text-gray-800 dark:hover:text-white focus:outline-none"
          >
            <span className="sr-only">View cart</span>
            <FiShoppingCart className="w-6 h-6" />
            {cartItemCount > 0 && (
              <span className="absolute top-0 right-0 flex items-center justify-center w-5 h-5 text-xs font-bold text-white bg-red-600 rounded-full">
                {cartItemCount}
              </span>
            )}
          </Link>

          {/* Auth State */}
          {user ? (
            <Link
              to="/dashboard"
              className="p-2 text-gray-600 rounded-full dark:text-gray-300 hover:text-gray-800 dark:hover:text-white"
            >
              <span className="sr-only">My Account</span>
              <FiUser className="w-6 h-6" />
            </Link>
          ) : (
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700"
            >
              Login
            </Link>
          )}

          {/* Mobile Menu Button */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={toggleMobileMenu}
              type="button"
              className="inline-flex items-center justify-center p-2 text-gray-500 rounded-md dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={mobileMenuOpen}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <FiX className="block w-6 h-6" aria-hidden="true" />
              ) : (
                <FiMenu className="block w-6 h-6" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden" id="mobile-menu">
          <ul className="pt-2 pb-3 space-y-1">{navLinks}</ul>
        </div>
      )}
    </nav>
  );
};

export default Navbar;

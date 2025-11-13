import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaGithub } from "react-icons/fa";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-700 dark:text-gray-300 pt-16 pb-8">
      <div className="container mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Logo and About */}
          <div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              ShopEase
            </h2>
            <p className="max-w-xs text-sm">
              Your one-stop shop for local goods. Quality and convenience
              delivered to your doorstep.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Quick Links
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/products"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Shop
                </Link>
              </li>
              <li>
                <Link
                  to="/cart"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  My Cart
                </Link>
              </li>
              <li>
                <Link
                  to="/dashboard/my-orders"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  My Orders
                </Link>
              </li>
              <li>
                <Link
                  to="/login"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Login
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Company
            </h3>
            <ul className="space-y-3">
              <li>
                <Link
                  to="/about"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  to="/contact"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Contact
                </Link>
              </li>
              <li>
                <Link
                  to="/privacy-policy"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link
                  to="/terms-of-service"
                  className="hover:text-blue-600 dark:hover:text-blue-400 text-sm"
                >
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-900 dark:text-white uppercase tracking-wider mb-4">
              Follow Us
            </h3>
            <div className="flex space-x-5">
              <a
                href="#"
                className="hover:text-blue-700 dark:hover:text-blue-400"
              >
                <FaFacebook size={20} />
              </a>
              <a
                href="#"
                className="hover:text-blue-500 dark:hover:text-blue-300"
              >
                <FaTwitter size={20} />
              </a>
              <a
                href="#"
                className="hover:text-pink-600 dark:hover:text-pink-400"
              >
                <FaInstagram size={20} />
              </a>
              <a href="#" className="hover:text-gray-900 dark:hover:text-white">
                <FaGithub size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-300 dark:border-gray-700 text-center">
          <p className="text-sm">
            &copy; {new Date().getFullYear()} ShopEase. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

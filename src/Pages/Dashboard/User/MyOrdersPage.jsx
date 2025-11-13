import React from "react";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import LoadingSpinner from "../../../Common/UI/LoadingSpinner";
import { motion } from "framer-motion";
import {
  FiArchive,
  FiArrowRight,
  FiCheckCircle,
  FiLoader,
  FiTruck,
} from "react-icons/fi";
// import useAuth from '../../hooks/useAuth'; // Will be connected later

// Placeholder function for fetching user orders
// In a real app, this would hit 'GET /orders/:email'
const fetchUserOrders = async (userEmail) => {
  console.warn(
    `Using placeholder order data for ${userEmail}. Connect this to your API.`
  );

  // Mock data for demonstration
  const mockOrders = [
    {
      _id: "60c72b2f9b1d8e001c8e4b8a",
      createdAt: "2023-10-28T14:30:00Z",
      total: 234.99,
      status: "Shipped",
      items: [
        { name: "Wireless Bluetooth Headphones", quantity: 1 },
        { name: "Insulated Coffee Mug", quantity: 2 },
      ],
    },
    {
      _id: "60c72b2f9b1d8e001c8e4b8b",
      createdAt: "2023-10-25T10:15:00Z",
      total: 49.99,
      status: "Delivered",
      items: [{ name: "Vintage Leather Wallet", quantity: 1 }],
    },
    {
      _id: "60c72b2f9b1d8e001c8e4b8c",
      createdAt: "2023-10-29T18:45:00Z",
      total: 25.0,
      status: "Pending",
      items: [{ name: "Cotton Blend T-Shirt", quantity: 1 }],
    },
  ];

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockOrders);
      // To test empty state: resolve([]);
    }, 1000)
  );
};

// Page transition variants
const pageVariants = {
  initial: { opacity: 0, y: 20 },
  in: { opacity: 1, y: 0 },
  out: { opacity: 0, y: -20 },
};

const pageTransition = {
  type: "tween",
  ease: "anticipate",
  duration: 0.5,
};

// Helper to format date
const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

// Helper for status icon
const getStatusIcon = (status) => {
  switch (status) {
    case "Pending":
      return <FiLoader className="w-5 h-5 text-yellow-500 mr-2" />;
    case "Shipped":
      return <FiTruck className="w-5 h-5 text-blue-500 mr-2" />;
    case "Delivered":
      return <FiCheckCircle className="w-5 h-5 text-green-500 mr-2" />;
    default:
      return null;
  }
};

const MyOrdersPage = () => {
  // const { user } = useAuth(); // Get the real user later
  const userEmail = "placeholder@example.com"; // Use placeholder

  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["orders", userEmail], // Unique key for this user's orders
    queryFn: () => fetchUserOrders(userEmail),
    enabled: !!userEmail, // Only run query if user email is available
  });

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-600 dark:text-red-400">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>
          Could not load your orders:{" "}
          {error?.message || "Something went wrong."}
        </p>
      </div>
    );
  }

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
        My Orders
      </h1>

      {orders && orders.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-hidden">
          <ul
            role="list"
            className="divide-y divide-gray-200 dark:divide-gray-700"
          >
            {orders.map((order) => (
              <li key={order._id}>
                <Link
                  to={`/dashboard/orders/${order._id}`}
                  className="block hover:bg-gray-50 dark:hover:bg-gray-700 transition duration-150"
                >
                  <div className="p-4 sm:p-6">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400 truncate">
                        Order ID: {order._id}
                      </p>
                      <p className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                        {formatDate(order.createdAt)}
                      </p>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div>
                        <p className="text-xl font-bold text-gray-900 dark:text-white">
                          ${order.total.toFixed(2)}
                        </p>
                        <p className="mt-1 text-sm text-gray-600 dark:text-gray-300">
                          {order.items.length} item(s)
                        </p>
                      </div>
                      <div className="flex items-center text-sm font-medium">
                        {getStatusIcon(order.status)}
                        <span className="text-gray-800 dark:text-gray-200">
                          {order.status}
                        </span>
                        <FiArrowRight className="w-5 h-5 text-gray-400 ml-4 hidden sm:block" />
                      </div>
                    </div>
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      ) : (
        // Empty State
        <div className="text-center bg-white dark:bg-gray-800 rounded-lg shadow-sm py-20 px-6">
          <FiArchive className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
            No orders found
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            You haven't placed any orders yet.
          </p>
          <Link
            to="/products"
            className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
          >
            Start Shopping
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default MyOrdersPage;

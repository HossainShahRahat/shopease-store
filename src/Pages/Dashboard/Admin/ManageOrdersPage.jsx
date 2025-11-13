import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/UI/LoadingSpinner";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiCheckCircle,
  FiLoader,
  FiTruck,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
// import toast from 'react-hot-toast';

// --- Placeholder API Functions ---
const fetchAllOrders = async () => {
  console.warn(
    "Using placeholder order data. Connect this to your 'GET /orders' API."
  );
  return new Promise((res) =>
    setTimeout(
      () =>
        res([
          {
            _id: "60c72b2f9b1d8e001c8e4b8a",
            createdAt: "2023-10-28T14:30:00Z",
            email: "customer1@example.com",
            total: 234.99,
            status: "Shipped",
          },
          {
            _id: "60c72b2f9b1d8e001c8e4b8c",
            createdAt: "2023-10-29T18:45:00Z",
            email: "newcustomer@example.com",
            total: 25.0,
            status: "Pending",
          },
          {
            _id: "60c72b2f9b1d8e001c8e4b8b",
            createdAt: "2023-10-25T10:15:00Z",
            email: "customer2@example.com",
            total: 49.99,
            status: "Delivered",
          },
        ]),
      500
    )
  );
};

const updateOrderStatusAPI = async ({ orderId, status }) => {
  console.warn(
    `Simulating order status update (PATCH /orders/${orderId}) to ${status}. Connect this to your API.`
  );
  return new Promise((res) =>
    setTimeout(() => res({ _id: orderId, status }), 500)
  );
};
// --- End Placeholder API Functions ---

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
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

// Helper for status styles
const getStatusStyles = (status) => {
  switch (status) {
    case "Pending":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-800 dark:text-yellow-100";
    case "Shipped":
      return "bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-100";
    case "Delivered":
      return "bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100";
    case "Cancelled":
      return "bg-red-100 text-red-800 dark:bg-red-800 dark:text-red-100";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100";
  }
};

const OrderStatusDropdown = ({ order, onStatusChange, isLoading }) => {
  const [isOpen, setIsOpen] = useState(false);
  const statuses = ["Pending", "Shipped", "Delivered", "Cancelled"];

  const handleSelect = (status) => {
    if (status !== order.status) {
      onStatusChange({ orderId: order._id, status });
    }
    setIsOpen(false);
  };

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          disabled={isLoading}
          className={`inline-flex w-full justify-center items-center rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyles(
            order.status
          )} disabled:opacity-50`}
          onClick={() => setIsOpen(!isOpen)}
        >
          {order.status}
          <FiChevronDown className="w-4 h-4 ml-1.5" />
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 z-10 mt-2 w-40 origin-top-right rounded-md bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
          >
            <div className="py-1">
              {statuses.map((status) => (
                <button
                  key={status}
                  onClick={() => handleSelect(status)}
                  className={`block w-full text-left px-4 py-2 text-sm ${
                    status === order.status
                      ? "font-medium text-gray-900 dark:text-white"
                      : "text-gray-700 dark:text-gray-300"
                  } hover:bg-gray-100 dark:hover:bg-gray-700`}
                >
                  {status}
                </button>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const ManageOrdersPage = () => {
  const queryClient = useQueryClient();

  // Query to fetch all orders
  const {
    data: orders,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminOrders"],
    queryFn: fetchAllOrders,
  });

  // Mutation to update order status
  const updateStatusMutation = useMutation({
    mutationFn: updateOrderStatusAPI,
    onSuccess: (data) => {
      // toast.success(`Order ${data._id} status updated to ${data.status}`);
      // Manually update the query data to reflect the change immediately
      queryClient.setQueryData(["adminOrders"], (oldData) =>
        oldData.map((order) =>
          order._id === data._id ? { ...order, status: data.status } : order
        )
      );
    },
    onError: (err) => {
      // toast.error(`Failed to update status: ${err.message}`);
      console.error(err);
    },
  });

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Manage Orders
        </h1>
        {/* We can add filtering/search here later */}
      </div>

      {/* Orders Table */}
      {isLoading && <LoadingSpinner />}

      {isError && (
        <div className="text-center text-red-600 dark:text-red-400 py-10">
          <p>
            Error loading orders: {error?.message || "Something went wrong."}
          </p>
        </div>
      )}

      {orders && (
        <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Order ID
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Customer
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Total
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {orders.length === 0 ? (
                <tr>
                  <td
                    colSpan="6"
                    className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                  >
                    No orders found.
                  </td>
                </tr>
              ) : (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      #{order._id.slice(-6)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300">
                      {formatDate(order.createdAt)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                      {order.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <OrderStatusDropdown
                        order={order}
                        onStatusChange={updateStatusMutation.mutate}
                        isLoading={
                          updateStatusMutation.isLoading &&
                          updateStatusMutation.variables?.orderId === order._id
                        }
                      />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        // onClick={() => openOrderDetails(order)} // Placeholder for a details modal
                        className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </motion.div>
  );
};

export default ManageOrdersPage;

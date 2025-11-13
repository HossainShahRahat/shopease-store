import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUsers, FiPackage, FiClipboard, FiDollarSign } from "react-icons/fi";

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

// Card component for dashboard stats
const StatCard = ({ title, value, icon: Icon, color }) => (
  <motion.div
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 flex items-center space-x-4"
    whileHover={{ y: -5 }}
    transition={{ type: "spring", stiffness: 300 }}
  >
    <div className={`p-3 rounded-full ${color} text-white`}>
      <Icon className="w-6 h-6" />
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900 dark:text-white">
        {value}
      </p>
    </div>
  </motion.div>
);

// Card component for navigation links
const NavCard = ({ title, description, link, icon: Icon }) => (
  <motion.div
    whileHover={{
      y: -5,
      boxShadow:
        "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
    }}
    transition={{ type: "spring", stiffness: 300 }}
    className="bg-white dark:bg-gray-800 rounded-lg shadow-sm overflow-hidden"
  >
    <Link to={link} className="block p-6">
      <div className="flex items-center space-x-4">
        <div className="p-3 rounded-full bg-blue-100 dark:bg-blue-900 text-blue-600 dark:text-blue-300">
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            {title}
          </h3>
          <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </Link>
  </motion.div>
);

const AdminDashboard = () => {
  // Placeholder data for stats. This will come from an API query.
  const stats = {
    totalRevenue: "$12,450",
    totalOrders: 156,
    totalProducts: 78,
    totalCustomers: 42,
  };

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
        Admin Dashboard
      </h1>

      {/* Stats Overview */}
      <section className="mb-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Store Overview
        </h2>
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Total Revenue"
            value={stats.totalRevenue}
            icon={FiDollarSign}
            color="bg-green-500"
          />
          <StatCard
            title="Total Orders"
            value={stats.totalOrders}
            icon={FiClipboard}
            color="bg-blue-500"
          />
          <StatCard
            title="Total Products"
            value={stats.totalProducts}
            icon={FiPackage}
            color="bg-indigo-500"
          />
          <StatCard
            title="Total Customers"
            value={stats.totalCustomers}
            icon={FiUsers}
            color="bg-yellow-500"
          />
        </div>
      </section>

      {/* Admin Navigation */}
      <section>
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Management Tools
        </h2>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <NavCard
            title="Manage Products"
            description="Add, edit, and delete products from your inventory."
            link="/dashboard/admin/manage-products"
            icon={FiPackage}
          />
          <NavCard
            title="Manage Orders"
            description="View and update the status of all customer orders."
            link="/dashboard/admin/manage-orders"
            icon={FiClipboard}
          />
          {/* Add more cards here as features are built (e.g., Manage Users) */}
        </div>
      </section>

      {/* Placeholder for future charts/analytics */}
      <section className="mt-10">
        <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 mb-4">
          Sales Analytics
        </h2>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6 h-64 flex items-center justify-center">
          <p className="text-gray-500 dark:text-gray-400">
            Charts and analytics will be displayed here.
          </p>
        </div>
      </section>
    </motion.div>
  );
};

export default AdminDashboard;

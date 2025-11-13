import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FiShoppingCart, FiArrowRight } from "react-icons/fi";

const Banner = () => {
  // Animation variants for Framer Motion
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  };

  return (
    <div className="relative bg-gray-900 dark:bg-gray-800 text-white overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          className="relative grid grid-cols-1 lg:grid-cols-2 items-center py-16 sm:py-24 lg:py-32"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {/* Text Content */}
          <div className="relative z-10 text-center lg:text-left">
            <motion.span
              className="inline-block px-3 py-1 text-sm font-medium text-blue-300 bg-blue-900 bg-opacity-50 rounded-full"
              variants={itemVariants}
            >
              New Arrivals
            </motion.span>

            <motion.h1
              className="mt-4 text-4xl font-bold tracking-tight text-white sm:text-5xl lg:text-6xl"
              variants={itemVariants}
            >
              Winter Collection
            </motion.h1>

            <motion.p
              className="mt-6 text-lg text-gray-300 max-w-lg mx-auto lg:mx-0"
              variants={itemVariants}
            >
              Discover the latest trends in our local store. Quality products,
              great prices, and fast delivery right to your door.
            </motion.p>

            <motion.div
              className="mt-10 flex items-center justify-center lg:justify-start space-x-4"
              variants={itemVariants}
            >
              <Link
                to="/products"
                className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-gray-900 bg-white hover:bg-gray-200"
              >
                <FiShoppingCart className="w-5 h-5 mr-2" />
                Shop Now
              </Link>
              <Link
                to="/about" // Placeholder link
                className="inline-flex items-center px-6 py-3 text-base font-medium rounded-md text-white hover:bg-gray-700 hover:bg-opacity-50"
              >
                Learn More
                <FiArrowRight className="w-5 h-5 ml-2" />
              </Link>
            </motion.div>
          </div>

          {/* Image (Decorative) */}
          <div className="hidden lg:block relative mt-12 lg:mt-0 lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
            <motion.img
              className="h-full w-full object-cover object-center"
              src="https://via.placeholder.com/800x600?text=ShopEase+Banner" // Replace with a real banner image
              alt="Promotional banner image"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 0.8, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            />
            {/* Overlay to fade image */}
            <div className="absolute inset-0 bg-gradient-to-l from-gray-900 via-gray-900 to-transparent dark:from-gray-800 dark:via-gray-800"></div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Banner;

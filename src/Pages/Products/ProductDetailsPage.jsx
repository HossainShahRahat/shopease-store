import React, { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/UI/LoadingSpinner";
import { motion } from "framer-motion";
import { FiShoppingCart, FiChevronRight } from "react-icons/fi";

// Placeholder function for fetching a single product.
// In a real app, this would use 'fetch' or 'axios' to hit 'GET /products/:id'
const fetchProductById = async (productId) => {
  console.warn(
    `Using placeholder product data for ID: ${productId}. Connect this to your 'GET /products/:id' API.`
  );

  // Mock data for demonstration
  const mockProduct = {
    _id: productId,
    name: "Wireless Bluetooth Headphones",
    imageUrl: "https://via.placeholder.com/600",
    price: 199.99,
    category: "Electronics",
    stock: 5,
    description:
      "Experience immersive sound with these noise-cancelling wireless headphones. Features a 20-hour battery life, comfortable over-ear design, and seamless Bluetooth 5.0 connectivity. Perfect for music lovers, gamers, and remote work.",
  };

  return new Promise((resolve) =>
    setTimeout(() => {
      resolve(mockProduct);
    }, 500)
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

const ProductDetailsPage = () => {
  const { id } = useParams();
  const [quantity, setQuantity] = useState(1);

  const {
    data: product,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["product", id], // Unique key for this specific product
    queryFn: () => fetchProductById(id),
  });

  const handleQuantityChange = (change) => {
    setQuantity((prev) => {
      const newQuantity = prev + change;
      if (newQuantity < 1) return 1;
      if (newQuantity > (product?.stock || 1)) return product.stock;
      return newQuantity;
    });
  };

  const handleAddToCart = () => {
    console.log(`Added ${quantity} of product ${id} to cart.`);
    // toast.success('Added to cart!');
  };

  if (isLoading) {
    return <LoadingSpinner fullScreen />;
  }

  if (isError) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-red-600 dark:text-red-400">
        <h2 className="text-2xl font-bold">Error</h2>
        <p>
          Could not load product details:{" "}
          {error?.message || "Something went wrong."}
        </p>
        <Link
          to="/products"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-12 text-center text-gray-600 dark:text-gray-400">
        <h2 className="text-2xl font-bold">Product Not Found</h2>
        <p>We couldn't find the product you're looking for.</p>
        <Link
          to="/products"
          className="mt-4 inline-block text-blue-600 hover:underline"
        >
          Back to Shop
        </Link>
      </div>
    );
  }

  const stockStatus =
    product.stock > 0
      ? `In Stock (${product.stock} available)`
      : "Out of Stock";

  const stockColor =
    product.stock > 0
      ? "text-green-600 dark:text-green-400"
      : "text-red-600 dark:text-red-400";

  return (
    <motion.div
      className="container mx-auto px-4 sm:px-6 lg:px-8 py-12"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      {/* Breadcrumbs */}
      <nav className="flex mb-4 text-sm" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <li>
            <Link
              to="/"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Home
            </Link>
          </li>
          <li>
            <FiChevronRight className="w-4 h-4" />
          </li>
          <li>
            <Link
              to="/products"
              className="hover:text-gray-700 dark:hover:text-gray-200"
            >
              Shop
            </Link>
          </li>
          <li>
            <FiChevronRight className="w-4 h-4" />
          </li>
          <li>
            <span
              className="font-medium text-gray-700 dark:text-gray-200"
              aria-current="page"
            >
              {product.name}
            </span>
          </li>
        </ol>
      </nav>

      {/* Product Details Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
        {/* Product Image */}
        <motion.div
          className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 shadow-sm"
          whileHover={{ scale: 1.02 }}
        >
          <img
            src={product.imageUrl}
            alt={product.name}
            className="w-full h-full object-cover object-center"
          />
        </motion.div>

        {/* Product Info */}
        <div className="flex flex-col justify-center">
          <span className="text-sm font-medium text-blue-600 dark:text-blue-400 uppercase">
            {product.category}
          </span>
          <h1 className="mt-2 text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">
            {product.name}
          </h1>
          <p className="mt-4 text-3xl font-medium text-gray-800 dark:text-gray-100">
            ${product.price.toFixed(2)}
          </p>
          <p className={`mt-2 text-sm font-medium ${stockColor}`}>
            {stockStatus}
          </p>

          <div className="mt-6">
            <h3 className="sr-only">Description</h3>
            <p className="text-base text-gray-700 dark:text-gray-300">
              {product.description}
            </p>
          </div>

          {/* Add to Cart Section */}
          <div className="mt-8">
            <div className="flex items-center space-x-4">
              {/* Quantity Selector */}
              <div className="flex items-center rounded border border-gray-300 dark:border-gray-600">
                <button
                  onClick={() => handleQuantityChange(-1)}
                  disabled={quantity <= 1}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  -
                </button>
                <span className="px-4 py-2 font-medium text-gray-900 dark:text-white">
                  {quantity}
                </span>
                <button
                  onClick={() => handleQuantityChange(1)}
                  disabled={quantity >= product.stock || product.stock === 0}
                  className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                >
                  +
                </button>
              </div>

              {/* Add to Cart Button */}
              <button
                onClick={handleAddToCart}
                disabled={product.stock === 0}
                className="flex-1 flex items-center justify-center rounded-md border border-transparent bg-blue-600 py-3 px-8 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <FiShoppingCart className="w-5 h-5 mr-2" />
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductDetailsPage;

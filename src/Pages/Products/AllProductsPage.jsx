import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../Common/Product/ProductCard";
import LoadingSpinner from "../../Common/UI/LoadingSpinner";
import SearchFilter from "../../Common/Search/SearchFilter";
import { motion } from "framer-motion";

// Placeholder function for fetching products.
const fetchProducts = async () => {
  console.warn(
    "Using placeholder product data. Connect this to your 'GET /products' API."
  );

  // Mock data for demonstration
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        // Updated placeholder URLs
        {
          _id: "1",
          name: "Vintage Leather Wallet",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 49.99,
          category: "Accessories",
          stock: 10,
        },
        {
          _id: "2",
          name: "Wireless Bluetooth Headphones",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 199.99,
          category: "Electronics",
          stock: 5,
        },
        {
          _id: "3",
          name: "Minimalist Wrist Watch",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 120.0,
          category: "Watches",
          stock: 0,
        },
        {
          _id: "4",
          name: "Cotton Blend T-Shirt",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 25.0,
          category: "Clothing",
          stock: 50,
        },
        {
          _id: "5",
          name: "Insulated Coffee Mug",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 30.0,
          category: "Home Goods",
          stock: 15,
        },
        {
          _id: "6",
          name: "Running Shoes",
          imageUrl: "https://placehold.co/300x300/e2e8f0/64748b?text=Product",
          price: 89.99,
          category: "Sports",
          stock: 8,
        },
      ]);
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

const AllProductsPage = () => {
  // Use React Query to fetch and cache product data
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["products"], // Caching key for this query
    queryFn: fetchProducts,
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
      <header className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Our Products
        </h1>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Browse our collection of quality goods.
        </p>
      </header>

      {/* Filters and Search Bar */}
      <SearchFilter />

      {/* Products Grid */}
      <div>
        {isLoading && <LoadingSpinner />}

        {isError && (
          <div className="text-center text-red-600 dark:text-red-400 py-10">
            <p>
              Error loading products:{" "}
              {error?.message || "Something went wrong."}
            </p>
          </div>
        )}

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}

        {products && products.length === 0 && (
          <div className="text-center text-gray-500 dark:text-gray-400 py-10">
            <p>No products found matching your criteria.</p>
          </div>
        )}
      </div>

      {/* Pagination (Placeholder) */}
      <nav className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 px-4 py-6 sm:px-0 mt-12">
        <div className="flex w-0 flex-1">
          <a
            href="#"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Previous
          </a>
        </div>
        <div className="hidden md:flex">
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-600"
            aria-current="page"
          >
            1
          </a>
          <a
            href="#"
            className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-500 hover:text-gray-700 dark:text-gray-300 dark:hover:text-white"
          >
            2
          </a>
        </div>
        <div className="flex w-0 flex-1 justify-end">
          <a
            href="#"
            className="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-500 hover:bg-gray-50 dark:bg-gray-800 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
          >
            Next
          </a>
        </div>
      </nav>
    </motion.div>
  );
};

export default AllProductsPage;

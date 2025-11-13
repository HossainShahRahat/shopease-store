import React from "react";
import { useQuery } from "@tanstack/react-query";
import ProductCard from "../../../Common/Product/ProductCard";
import LoadingSpinner from "../../../Common/UI/LoadingSpinner";
import { Link } from "react-router-dom";
import { FiArrowRight } from "react-icons/fi";

// Placeholder function for fetching featured products.
// In a real app, this would hit an API like 'GET /products?featured=true&limit=4'
const fetchFeaturedProducts = async () => {
  console.warn(
    "Using placeholder featured product data. Connect this to your API."
  );

  // Mock data for demonstration (slice of the full list)
  return new Promise((resolve) =>
    setTimeout(() => {
      resolve([
        {
          _id: "2",
          name: "Wireless Bluetooth Headphones",
          imageUrl: "https://via.placeholder.com/300",
          price: 199.99,
          category: "Electronics",
          stock: 5,
        },
        {
          _id: "1",
          name: "Vintage Leather Wallet",
          imageUrl: "https://via.placeholder.com/300",
          price: 49.99,
          category: "Accessories",
          stock: 10,
        },
        {
          _id: "5",
          name: "Insulated Coffee Mug",
          imageUrl: "https://via.placeholder.com/300",
          price: 30.0,
          category: "Home Goods",
          stock: 15,
        },
        {
          _id: "4",
          name: "Cotton Blend T-Shirt",
          imageUrl: "https://via.placeholder.com/300",
          price: 25.0,
          category: "Clothing",
          stock: 50,
        },
      ]);
    }, 800)
  );
};

const FeaturedProducts = () => {
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["featuredProducts"], // Caching key for this query
    queryFn: fetchFeaturedProducts,
  });

  return (
    <section className="py-12">
      {/* Section Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
            Featured Products
          </h2>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            Check out our most popular items.
          </p>
        </div>
        <Link
          to="/products"
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
        >
          View All Products
          <FiArrowRight className="w-4 h-4 ml-1" />
        </Link>
      </div>

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
          <div className="grid grid-cols-1 gap-y-10 gap-x-6 sm:grid-cols-2 lg:grid-cols-4 xl:gap-x-8">
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
};

export default FeaturedProducts;

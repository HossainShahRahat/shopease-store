import React from "react";
import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";

// Placeholder function for handling cart logic
const handleAddToCart = (e, productId) => {
  e.preventDefault(); // Stop the Link navigation
  e.stopPropagation(); // Stop bubbling
  console.log(`Added product ${productId} to cart`);
  // toast.success('Added to cart!');
};

const ProductCard = ({ product }) => {
  // Destructure product details
  const { _id, name, imageUrl, price, category, stock } = product;

  // Note: Removed framer-motion wrapper as it was unused.
  // Added Tailwind transitions for a clean hover effect.

  return (
    <div className="group relative flex flex-col overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800 transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-md">
      <Link to={`/products/${_id}`} className="flex-grow">
        {/* Product Image */}
        <div className="aspect-w-1 aspect-h-1 w-full overflow-hidden bg-gray-100 dark:bg-gray-700">
          <img
            // Updated placeholder URL
            src={
              imageUrl ||
              "https://placehold.co/300x300/e2e8f0/64748b?text=Product"
            }
            alt={name}
            className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
          />
        </div>

        {/* Product Details */}
        <div className="p-4">
          <span className="text-xs font-medium text-gray-500 dark:text-gray-400 uppercase">
            {category || "Uncategorized"}
          </span>
          <h3 className="mt-1 text-base font-semibold text-gray-900 dark:text-white truncate">
            {name}
          </h3>
          <p className="mt-2 text-lg font-bold text-blue-600 dark:text-blue-400">
            ${price?.toFixed(2)}
          </p>
        </div>
      </Link>

      {/* Add to Cart Button */}
      <div className="p-4 pt-0">
        <button
          onClick={(e) => handleAddToCart(e, _id)}
          disabled={stock === 0}
          className="flex w-full items-center justify-center rounded-md border border-transparent bg-gray-800 px-4 py-2 text-sm font-medium text-white hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-900 focus:ring-offset-2 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-600 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FiShoppingCart className="w-4 h-4 mr-2" />
          {stock === 0 ? "Out of Stock" : "Add to Cart"}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;

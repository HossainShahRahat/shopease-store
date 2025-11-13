import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiTrash2,
  FiPlus,
  FiMinus,
  FiArrowLeft,
  FiShoppingCart,
} from "react-icons/fi";
// import useCart from '../../hooks/useCart'; // Will be connected later

// --- Placeholder Data ---
const mockCartData = [
  {
    _id: "2",
    name: "Wireless Bluetooth Headphones",
    imageUrl: "https://via.placeholder.com/150",
    price: 199.99,
    quantity: 1,
    stock: 5,
  },
  {
    _id: "5",
    name: "Insulated Coffee Mug",
    imageUrl: "https://via.placeholder.com/150",
    price: 30.0,
    quantity: 2,
    stock: 15,
  },
];
// --- End Placeholder ---

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

const CartPage = () => {
  // We use useState for mock data to make remove/quantity changes work visually
  const [cartItems, setCartItems] = useState(mockCartData);
  // const { cart, updateQuantity, removeFromCart, isLoading } = useCart();

  const handleQuantityChange = (id, change) => {
    setCartItems((currentItems) =>
      currentItems.map((item) => {
        if (item._id === id) {
          const newQuantity = item.quantity + change;
          // Clamp quantity between 1 and available stock
          if (newQuantity < 1) return { ...item, quantity: 1 };
          if (newQuantity > item.stock)
            return { ...item, quantity: item.stock };
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
    // In real app: updateQuantity(id, newQuantity);
  };

  const handleRemoveItem = (id) => {
    setCartItems((currentItems) =>
      currentItems.filter((item) => item._id !== id)
    );
    // In real app: removeFromCart(id);
    // toast.success('Item removed');
  };

  // Calculate totals
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = cartSubtotal > 50 ? 0 : 5.0; // Example shipping logic
  const totalCost = cartSubtotal + shippingCost;

  // if (isLoading) return <LoadingSpinner fullScreen />;

  // Empty Cart View
  if (!cartItems || cartItems.length === 0) {
    return (
      <motion.div
        className="container mx-auto px-4 sm:px-6 lg:px-8 py-24 text-center"
        initial="initial"
        animate="in"
        exit="out"
        variants={pageVariants}
        transition={pageTransition}
      >
        <FiShoppingCart className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" />
        <h2 className="mt-4 text-2xl font-bold text-gray-900 dark:text-white">
          Your cart is empty
        </h2>
        <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
          Looks like you haven't added anything to your cart yet.
        </p>
        <Link
          to="/products"
          className="mt-6 inline-flex items-center rounded-md border border-transparent bg-blue-600 px-5 py-3 text-base font-medium text-white hover:bg-blue-700"
        >
          <FiArrowLeft className="w-5 h-5 mr-2" />
          Start Shopping
        </Link>
      </motion.div>
    );
  }

  // Cart View with Items
  return (
    <motion.div
      className="bg-gray-50 dark:bg-gray-900"
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
          Shopping Cart
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12">
          {/* Cart Items List (Left) */}
          <section className="lg:col-span-2">
            <ul
              role="list"
              className="divide-y divide-gray-200 dark:divide-gray-700 rounded-lg bg-white dark:bg-gray-800 shadow-sm overflow-hidden"
            >
              {cartItems.map((item) => (
                <li
                  key={item._id}
                  className="flex flex-col sm:flex-row p-4 sm:p-6"
                >
                  {/* Image */}
                  <div className="flex-shrink-0">
                    <img
                      src={item.imageUrl}
                      alt={item.name}
                      className="h-24 w-24 rounded-md object-cover object-center sm:h-32 sm:w-32"
                    />
                  </div>

                  {/* Item Details */}
                  <div className="ml-0 sm:ml-6 mt-4 sm:mt-0 flex flex-1 flex-col justify-between">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white">
                        <Link to={`/products/${item._id}`}>{item.name}</Link>
                      </h3>
                      <p className="mt-1 text-lg font-semibold text-blue-600 dark:text-blue-400">
                        ${item.price.toFixed(2)}
                      </p>
                    </div>

                    <div className="mt-4 flex items-center justify-between">
                      {/* Quantity Selector */}
                      <div className="flex items-center rounded border border-gray-300 dark:border-gray-600">
                        <button
                          onClick={() => handleQuantityChange(item._id, -1)}
                          disabled={item.quantity <= 1}
                          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                          <FiMinus className="w-4 h-4" />
                        </button>
                        <span className="px-4 py-2 text-sm font-medium text-gray-900 dark:text-white">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() => handleQuantityChange(item._id, 1)}
                          disabled={item.quantity >= item.stock}
                          className="px-3 py-2 text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 disabled:opacity-50"
                        >
                          <FiPlus className="w-4 h-4" />
                        </button>
                      </div>

                      {/* Remove Button */}
                      <button
                        type="button"
                        onClick={() => handleRemoveItem(item._id)}
                        className="ml-4 flex items-center text-sm font-medium text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                      >
                        <FiTrash2 className="w-5 h-5 mr-1" />
                        Remove
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Order Summary (Right) */}
          <section className="mt-10 lg:mt-0 lg:col-span-1">
            <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm p-6 sticky top-24">
              {" "}
              {/* Sticky for desktop */}
              <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Order Summary
              </h2>
              <dl className="mt-6 space-y-4">
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">
                    Subtotal
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    ${cartSubtotal.toFixed(2)}
                  </dd>
                </div>
                <div className="flex items-center justify-between">
                  <dt className="text-sm text-gray-600 dark:text-gray-400">
                    Shipping
                  </dt>
                  <dd className="text-sm font-medium text-gray-900 dark:text-white">
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </dd>
                </div>
                <div className="flex items-center justify-between border-t border-gray-200 dark:border-gray-700 pt-4">
                  <dt className="text-base font-bold text-gray-900 dark:text-white">
                    Total
                  </dt>
                  <dd className="text-base font-bold text-gray-900 dark:text-white">
                    ${totalCost.toFixed(2)}
                  </dd>
                </div>
              </dl>
              <div className="mt-8">
                <Link
                  to="/checkout"
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700"
                >
                  Proceed to Checkout
                </Link>
              </div>
              <div className="mt-6 text-center">
                <Link
                  to="/products"
                  className="flex items-center justify-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <FiArrowLeft className="w-4 h-4 mr-1" />
                  Continue Shopping
                </Link>
              </div>
            </div>
          </section>
        </div>
      </div>
    </motion.div>
  );
};

export default CartPage;

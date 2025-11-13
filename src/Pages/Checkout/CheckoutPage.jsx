import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FiLock, FiArrowLeft } from "react-icons/fi";
// import useCart from '../../hooks/useCart'; // Will be connected later
// import useAuth from '../../hooks/useAuth'; // Will be connected later

// --- Placeholder Data ---
const mockCartData = [
  {
    _id: "2",
    name: "Wireless Bluetooth Headphones",
    price: 199.99,
    quantity: 1,
  },
  { _id: "5", name: "Insulated Coffee Mug", price: 30.0, quantity: 2 },
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

const CheckoutPage = () => {
  // const { cart, clearCart } = useCart();
  // const { user } = useAuth();
  const navigate = useNavigate();

  // Use mock data for now
  const cartItems = mockCartData;
  // const userEmail = user?.email || 'test.user@example.com';

  const [loading, setLoading] = useState(false);

  // Form state
  const [shippingInfo, setShippingInfo] = useState({
    name: "", // We could pre-fill this from user.displayName
    address: "",
    city: "",
    postalCode: "",
    country: "United States", // Default value
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingInfo((prev) => ({ ...prev, [name]: value }));
  };

  // Calculate totals
  const cartSubtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shippingCost = cartSubtotal > 50 ? 0 : 5.0;
  const totalCost = cartSubtotal + shippingCost;

  const handleSubmitOrder = async (e) => {
    e.preventDefault();
    setLoading(true);

    // 1. Validate form data
    if (
      !shippingInfo.name ||
      !shippingInfo.address ||
      !shippingInfo.city ||
      !shippingInfo.postalCode
    ) {
      // toast.error('Please fill in all shipping details.');
      console.error("Missing shipping details");
      setLoading(false);
      return;
    }

    // 2. Create the order object
    const orderDetails = {
      // email: userEmail,
      shippingAddress: shippingInfo,
      items: cartItems.map((item) => ({
        productId: item._id,
        name: item.name,
        quantity: item.quantity,
        price: item.price,
      })),
      subtotal: cartSubtotal,
      shipping: shippingCost,
      total: totalCost,
      status: "Pending", // Initial status
      createdAt: new Date().toISOString(),
    };

    try {
      // 3. (Placeholder) Send to backend: POST /orders
      console.log("Submitting order:", orderDetails);
      await new Promise((res) => setTimeout(res, 1500)); // Simulate API call

      // 4. (Placeholder) Handle payment (e.g., redirect to Stripe)

      // 5. On success
      // toast.success('Order placed successfully!');
      // clearCart(); // Clear cart from context/state
      navigate("/dashboard/my-orders"); // Redirect to orders page
    } catch (err) {
      console.error("Failed to place order:", err);
      // toast.error('Failed to place order. Please try again.');
      setLoading(false);
    }
  };

  const inputStyles =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm";
  const labelStyles =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";

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
        {/* Back to Cart link */}
        <Link
          to="/cart"
          className="flex items-center text-sm font-medium text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 mb-4"
        >
          <FiArrowLeft className="w-4 h-4 mr-1" />
          Back to Cart
        </Link>

        <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white mb-8">
          Checkout
        </h1>

        <form
          onSubmit={handleSubmitOrder}
          className="grid grid-cols-1 lg:grid-cols-3 lg:gap-12"
        >
          {/* Shipping & Payment (Left/Main) */}
          <div className="lg:col-span-2 space-y-8">
            {/* Shipping Information */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Shipping Information
              </h2>
              <div className="mt-6 grid grid-cols-1 gap-y-6 sm:grid-cols-2 sm:gap-x-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="name" className={labelStyles}>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className={inputStyles}
                    value={shippingInfo.name}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Address */}
                <div className="sm:col-span-2">
                  <label htmlFor="address" className={labelStyles}>
                    Address
                  </label>
                  <input
                    type="text"
                    name="address"
                    id="address"
                    required
                    className={inputStyles}
                    value={shippingInfo.address}
                    onChange={handleInputChange}
                  />
                </div>

                {/* City */}
                <div>
                  <label htmlFor="city" className={labelStyles}>
                    City
                  </label>
                  <input
                    type="text"
                    name="city"
                    id="city"
                    required
                    className={inputStyles}
                    value={shippingInfo.city}
                    onChange={handleInputChange}
                  />
                </div>

                {/* Postal Code */}
                <div>
                  <label htmlFor="postalCode" className={labelStyles}>
                    Postal Code
                  </label>
                  <input
                    type="text"
                    name="postalCode"
                    id="postalCode"
                    required
                    className={inputStyles}
                    value={shippingInfo.postalCode}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
            </section>

            {/* Payment Details (Placeholder) */}
            <section className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Payment Details
              </h2>
              <div className="mt-6 h-32 flex items-center justify-center rounded-md border-2 border-dashed border-gray-300 dark:border-gray-600">
                <p className="text-gray-500 dark:text-gray-400">
                  Payment Gateway (e.g., Stripe) will be integrated here.
                </p>
              </div>
            </section>
          </div>

          {/* Order Summary (Right) */}
          <section className="mt-10 lg:mt-0 lg:col-span-1">
            <div className="rounded-lg bg-white dark:bg-gray-800 shadow-sm p-6 sticky top-24">
              <h2 className="text-lg font-medium text-gray-900 dark:text-white border-b border-gray-200 dark:border-gray-700 pb-4">
                Order Summary
              </h2>

              {/* Item List */}
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700 my-4"
              >
                {cartItems.map((item) => (
                  <li key={item._id} className="flex py-4">
                    <div className="ml-3 flex-1">
                      <h4 className="text-sm font-medium text-gray-900 dark:text-white">
                        {item.name}
                      </h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Qty: {item.quantity}
                      </p>
                    </div>
                    <p className="text-sm font-medium text-gray-900 dark:text-white">
                      ${(item.price * item.quantity).toFixed(2)}
                    </p>
                  </li>
                ))}
              </ul>

              <dl className="space-y-4 border-t border-gray-200 dark:border-gray-700 pt-4">
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
                <button
                  type="submit"
                  disabled={loading || cartItems.length === 0}
                  className="w-full flex items-center justify-center rounded-md border border-transparent bg-blue-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-blue-700 disabled:opacity-50"
                >
                  <FiLock className="w-5 h-5 mr-2" />
                  {loading
                    ? "Processing..."
                    : `Confirm and Pay $${totalCost.toFixed(2)}`}
                </button>
              </div>
            </div>
          </section>
        </form>
      </div>
    </motion.div>
  );
};

export default CheckoutPage;

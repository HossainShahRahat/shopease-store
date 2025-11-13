import React, { useState } from "react";

// This form is now designed to be re-mounted when the 'product' prop changes.
// The parent component should pass a unique 'key' prop, e.g., <ProductForm key={product?._id || 'new'} ... />
// This avoids the 'set-state-in-effect' lint error by ensuring state initializes fresh.

const ProductForm = ({
  product,
  onSubmit,
  loading,
  submitButtonText = "Submit",
}) => {
  // Initialize state directly from the 'product' prop.
  // This function now only runs ONCE when the component mounts (or re-mounts due to key change).
  const [formData, setFormData] = useState({
    name: product?.name || "",
    imageUrl: product?.imageUrl || "",
    price: product?.price || "",
    stock: product?.stock || "",
    category: product?.category || "",
    description: product?.description || "",
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseFloat(value) : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (loading) return; // Prevent multiple submissions
    onSubmit(formData);
  };

  const inputStyles =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm";
  const labelStyles =
    "block text-sm font-medium text-gray-700 dark:text-gray-300";

  return (
    <motion.form
      onSubmit={handleSubmit}
      className="space-y-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
        {/* Product Name */}
        <div className="sm:col-span-4">
          <label htmlFor="name" className={labelStyles}>
            Product Name
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="name"
              id="name"
              required
              className={inputStyles}
              value={formData.name}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Image URL */}
        <div className="sm:col-span-6">
          <label htmlFor="imageUrl" className={labelStyles}>
            Image URL
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="imageUrl"
              id="imageUrl"
              required
              className={inputStyles}
              value={formData.imageUrl}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Price */}
        <div className="sm:col-span-2">
          <label htmlFor="price" className={labelStyles}>
            Price ($)
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="price"
              id="price"
              required
              min="0"
              step="0.01"
              className={inputStyles}
              value={formData.price}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Stock */}
        <div className="sm:col-span-2">
          <label htmlFor="stock" className={labelStyles}>
            Stock Quantity
          </label>
          <div className="mt-1">
            <input
              type="number"
              name="stock"
              id="stock"
              required
              min="0"
              step="1"
              className={inputStyles}
              value={formData.stock}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Category */}
        <div className="sm:col-span-2">
          <label htmlFor="category" className={labelStyles}>
            Category
          </label>
          <div className="mt-1">
            <input
              type="text"
              name="category"
              id="category"
              required
              className={inputStyles}
              value={formData.category}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
        </div>

        {/* Description */}
        <div className="sm:col-span-6">
          <label htmlFor="description" className={labelStyles}>
            Description
          </label>
          <div className="mt-1">
            <textarea
              id="description"
              name="description"
              rows={4}
              required
              className={inputStyles}
              value={formData.description}
              onChange={handleChange}
              disabled={loading}
            />
          </div>
          <p className="mt-2 text-sm text-gray-500">
            Brief description for the product.
          </p>
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-5">
        <div className="flex justify-end">
          <button
            type="submit"
            className="inline-flex justify-center rounded-md border border-transparent bg-blue-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50"
            disabled={loading}
          >
            {loading ? "Submitting..." : submitButtonText}
          </button>
        </div>
      </div>
    </motion.form>
  );
};

export default ProductForm;

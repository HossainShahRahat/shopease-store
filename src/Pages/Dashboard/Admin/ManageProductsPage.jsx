import React, { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import LoadingSpinner from "../../Common/UI/LoadingSpinner";
import ProductForm from "../../Common/Product/ProductForm";
import { motion, AnimatePresence } from "framer-motion";
import { FiEdit, FiTrash2, FiPlus, FiX } from "react-icons/fi";
// import toast from 'react-hot-toast';
// import Swal from 'sweetalert2';

// --- Placeholder API Functions ---
// These would be in a separate api.js file and use fetch/axios
const fetchProducts = async () => {
  console.warn(
    "Using placeholder product data. Connect this to your 'GET /products' API."
  );
  return new Promise((res) =>
    setTimeout(
      () =>
        res([
          {
            _id: "1",
            name: "Vintage Leather Wallet",
            imageUrl: "https://via.placeholder.com/100",
            price: 49.99,
            category: "Accessories",
            stock: 10,
          },
          {
            _id: "2",
            name: "Wireless Bluetooth Headphones",
            imageUrl: "https://via.placeholder.com/100",
            price: 199.99,
            category: "Electronics",
            stock: 5,
          },
          {
            _id: "3",
            name: "Minimalist Wrist Watch",
            imageUrl: "https://via.placeholder.com/100",
            price: 120.0,
            category: "Watches",
            stock: 0,
          },
        ]),
      500
    )
  );
};

const addProductAPI = async (newProduct) => {
  console.warn(
    "Simulating 'POST /products'. Connect this to your API.",
    newProduct
  );
  return new Promise((res) =>
    setTimeout(() => res({ ...newProduct, _id: Math.random().toString() }), 500)
  );
};

const updateProductAPI = async (updatedProduct) => {
  console.warn(
    `Simulating 'PATCH /products/${updatedProduct._id}'. Connect this to your API.`,
    updatedProduct
  );
  return new Promise((res) => setTimeout(() => res(updatedProduct), 500));
};

const deleteProductAPI = async (productId) => {
  console.warn(
    `Simulating 'DELETE /products/${productId}'. Connect this to your API.`
  );
  return new Promise((res) => setTimeout(() => res({ success: true }), 500));
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

// Modal animation variants
const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};
const modalVariants = {
  hidden: { opacity: 0, y: -50, scale: 0.95 },
  visible: { opacity: 1, y: 0, scale: 1 },
};

const ManageProductsPage = () => {
  const queryClient = useQueryClient();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Query to fetch all products
  const {
    data: products,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["adminProducts"], // Use a different key than public 'products'
    queryFn: fetchProducts,
  });

  // Mutation to add a product
  const addProductMutation = useMutation({
    mutationFn: addProductAPI,
    onSuccess: () => {
      // toast.success('Product added successfully!');
      queryClient.invalidateQueries(["adminProducts"]);
      closeModal();
    },
    onError: (err) => {
      // toast.error(`Failed to add product: ${err.message}`);
      console.error(err);
    },
  });

  // Mutation to update a product
  const updateProductMutation = useMutation({
    mutationFn: updateProductAPI,
    onSuccess: () => {
      // toast.success('Product updated successfully!');
      queryClient.invalidateQueries(["adminProducts"]);
      closeModal();
    },
    onError: (err) => {
      // toast.error(`Failed to update product: ${err.message}`);
      console.error(err);
    },
  });

  // Mutation to delete a product
  const deleteProductMutation = useMutation({
    mutationFn: deleteProductAPI,
    onSuccess: () => {
      // toast.success('Product deleted successfully!');
      queryClient.invalidateQueries(["adminProducts"]);
    },
    onError: (err) => {
      // toast.error(`Failed to delete product: ${err.message}`);
      console.error(err);
    },
  });

  // --- Modal and Form Handlers ---
  const openAddModal = () => {
    setSelectedProduct(null); // Clear selection for 'add' mode
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setSelectedProduct(product); // Set selection for 'edit' mode
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  // Handle form submission
  const handleFormSubmit = (formData) => {
    if (selectedProduct) {
      // Update existing product
      updateProductMutation.mutate({ ...formData, _id: selectedProduct._id });
    } else {
      // Add new product
      addProductMutation.mutate(formData);
    }
  };

  // Handle product deletion
  const handleDeleteProduct = (productId) => {
    // We'll use window.confirm for simplicity, but SweetAlert2 is in the docs
    if (
      window.confirm(
        "Are you sure you want to delete this product? This action cannot be undone."
      )
    ) {
      deleteProductMutation.mutate(productId);
    }

    /* Example with SweetAlert2
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteProductMutation.mutate(productId);
      }
    });
    */
  };

  const isMutating =
    addProductMutation.isLoading || updateProductMutation.isLoading;

  return (
    <>
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
            Manage Products
          </h1>
          <button
            onClick={openAddModal}
            className="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700"
          >
            <FiPlus className="w-5 h-5 mr-2" />
            Add New Product
          </button>
        </div>

        {/* Product Table */}
        {isLoading && <LoadingSpinner />}

        {isError && (
          <div className="text-center text-red-600 dark:text-red-400 py-10">
            <p>
              Error loading products:{" "}
              {error?.message || "Something went wrong."}
            </p>
          </div>
        )}

        {products && (
          <div className="bg-white dark:bg-gray-800 shadow-sm rounded-lg overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
              <thead className="bg-gray-50 dark:bg-gray-700">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Product
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Category
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Price
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider"
                  >
                    Stock
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
                {products.length === 0 ? (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500 dark:text-gray-400"
                    >
                      No products found.
                    </td>
                  </tr>
                ) : (
                  products.map((product) => (
                    <tr
                      key={product._id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700"
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-12 w-12">
                            <img
                              className="h-12 w-12 rounded-md object-cover"
                              src={product.imageUrl}
                              alt={product.name}
                            />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-xs">
                              {product.name}
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-100">
                          {product.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        ${product.price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-gray-200">
                        {product.stock}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium space-x-3">
                        <button
                          onClick={() => openEditModal(product)}
                          className="text-blue-600 hover:text-blue-900 dark:text-blue-400 dark:hover:text-blue-300"
                          aria-label="Edit"
                        >
                          <FiEdit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleDeleteProduct(product._id)}
                          disabled={deleteProductMutation.isLoading}
                          className="text-red-600 hover:text-red-900 dark:text-red-400 dark:hover:text-red-300 disabled:opacity-50"
                          aria-label="Delete"
                        >
                          <FiTrash2 className="w-5 h-5" />
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

      {/* Product Form Modal */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4"
            variants={backdropVariants}
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            {/* Backdrop */}
            <div
              onClick={closeModal}
              className="absolute inset-0 bg-black bg-opacity-50 dark:bg-opacity-70"
            />

            {/* Modal Content */}
            <motion.div
              className="relative w-full max-w-3xl bg-white dark:bg-gray-800 rounded-lg shadow-xl max-h-[90vh] overflow-y-auto"
              variants={modalVariants}
            >
              <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
                <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                  {selectedProduct ? "Edit Product" : "Add New Product"}
                </h3>
                <button
                  onClick={closeModal}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <FiX className="w-6 h-6" />
                </button>
              </div>

              <div className="p-6">
                <ProductForm
                  key={selectedProduct?._id || "new"}
                  product={selectedProduct}
                  onSubmit={handleFormSubmit}
                  loading={isMutating}
                  submitButtonText={
                    selectedProduct ? "Save Changes" : "Add Product"
                  }
                />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ManageProductsPage;

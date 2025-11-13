import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

// Layout
import MainLayout from "./Common/Layout/MainLayout";

// Public Pages
import HomePage from "./Pages/Home/HomePage";
import AllProductsPage from "./Pages/Products/AllProductsPage";
import ProductDetailsPage from "./Pages/Products/ProductDetailsPage";
import LoginPage from "./Pages/Auth/LoginPage";
import RegisterPage from "./Pages/Auth/RegisterPage";
import CartPage from "./Pages/Cart/CartPage";

// Protected Pages
import ProtectedRoute from "./Common/UI/ProtectedRoute";
import CheckoutPage from "./Pages/Checkout/CheckoutPage";
import MyOrdersPage from "./Pages/Dashboard/User/MyOrdersPage";

// Admin Pages
import AdminRoute from "./Common/UI/AdminRoute";
import AdminDashboard from "./Pages/Dashboard/Admin/AdminDashboard";
import ManageProductsPage from "./Pages/Dashboard/Admin/ManageProductsPage";
import ManageOrdersPage from "./Pages/Dashboard/Admin/ManageOrdersPage";

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    // We can add an ErrorPage component here later
    // errorElement: <ErrorPage />,
    children: [
      // Public Routes
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/products",
        element: <AllProductsPage />,
      },
      {
        path: "/products/:id",
        element: <ProductDetailsPage />,
        // We'll add a loader here later to fetch data
        // loader: ({ params }) => fetch(`/api/products/${params.id}`),
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/register",
        element: <RegisterPage />,
      },

      // Protected User Routes
      {
        path: "/checkout",
        element: (
          <ProtectedRoute>
            <CheckoutPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard", // Generic dashboard link
        element: (
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "/dashboard/my-orders",
        element: (
          <ProtectedRoute>
            <MyOrdersPage />
          </ProtectedRoute>
        ),
      },

      // Protected Admin Routes
      {
        path: "/dashboard/admin",
        element: (
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-products",
        element: (
          <AdminRoute>
            <ManageProductsPage />
          </AdminRoute>
        ),
      },
      {
        path: "/dashboard/admin/manage-orders",
        element: (
          <AdminRoute>
            <ManageOrdersPage />
          </AdminRoute>
        ),
      },
    ],
  },
]);

function App() {
  // RouterProvider provides the router context to the app
  return <RouterProvider router={router} />;
}

export default App;

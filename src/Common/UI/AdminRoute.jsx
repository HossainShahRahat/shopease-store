import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import useAuth from '../../hooks/useAuth'; // We will create this hook later for Firebase
// import useAdmin from '../../hooks/useAdmin'; // We will create this hook later
import LoadingSpinner from "./LoadingSpinner";

// Placeholder hook until auth context is fully set up
const useAuth = () => {
  console.warn(
    "Using placeholder auth. Connect this to your Firebase context."
  );
  return {
    user: null, // Placeholder: null means not logged in
    loading: false, // Placeholder: false means auth check is complete
  };
};

// Placeholder hook for admin check
const useAdmin = () => {
  console.warn(
    "Using placeholder admin check. Connect this to your backend logic."
  );

  // -- DEV TESTING --
  // Set user to {} and isAdmin to true to test admin access
  // Set user to {} and isAdmin to false to test non-admin redirect

  return {
    isAdmin: false, // Placeholder: true means user is an admin
    adminLoading: false, // Placeholder: true means admin check is in progress
  };
};

const AdminRoute = ({ children }) => {
  const { user, loading: authLoading } = useAuth();
  const { isAdmin, adminLoading } = useAdmin();
  const location = useLocation();

  // Show spinner if either auth state or admin status is loading
  if (authLoading || adminLoading) {
    return <LoadingSpinner fullScreen />;
  }

  // If user is authenticated AND is an admin, render the child component
  if (user && isAdmin) {
    return children;
  }

  // If user is not authenticated, redirect to login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If user is authenticated but NOT an admin, redirect to home page
  // (We don't want to show them a "not authorized" page, just send them away)
  return <Navigate to="/" state={{ from: location }} replace />;
};

export default AdminRoute;

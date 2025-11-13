import React from "react";
import { Navigate, useLocation } from "react-router-dom";
// import useAuth from '../../hooks/useAuth'; // We will create this hook later for Firebase
import LoadingSpinner from "./LoadingSpinner";

// Placeholder hook until auth context is fully set up
const useAuth = () => {
  console.warn(
    "Using placeholder auth. Connect this to your Firebase context."
  );

  // -- DEV TESTING --
  // Set loading to true to test spinner
  // Set user to {} to test protected access
  // Set user to null to test redirect

  return {
    user: null, // Placeholder: null means not logged in
    loading: false, // Placeholder: false means auth check is complete
  };
};

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  // Show a full-screen spinner while auth state is loading
  if (loading) {
    return <LoadingSpinner fullScreen />;
  }

  // If user is authenticated, render the child component
  if (user) {
    return children;
  }

  // If user is not authenticated, redirect to login page
  // We save the 'from' location to redirect them back after login
  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;

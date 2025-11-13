src/
├── Common/
│   ├── Layout/
│   │   └── MainLayout.jsx
│   ├── Header/
│   │   ├── Header.jsx
│   │   └── Navbar/
│   │       ├── Navbar.jsx
│   │       └── ThemeToggle.jsx
│   ├── Footer/
│   │   └── Footer.jsx
│   ├── Product/
│   │   ├── ProductCard.jsx       // Reusable card for product lists
│   │   └── ProductForm.jsx       // Reusable form for Add/Update
│   ├── UI/
│   │   ├── LoadingSpinner.jsx
│   │   └── ProtectedRoute.jsx    // Handles auth checks
│   │   └── AdminRoute.jsx        // Handles admin-only checks
│   └── Search/
│       └── SearchFilter.jsx      // Component for product filtering
│
├── Pages/
│   ├── Home/
│   │   ├── HomePage.jsx
│   │   ├── Banner/
│   │   │   └── Banner.jsx
│   │   └── FeaturedProducts/
│   │       └── FeaturedProducts.jsx
│   ├── Products/
│   │   ├── AllProductsPage.jsx   // Main shop page (GET /products)
│   │   └── ProductDetailsPage.jsx  // Single product view (GET /products/:id)
│   ├── Auth/
│   │   ├── LoginPage.jsx
│   │   └── RegisterPage.jsx
│   ├── Cart/
│   │   └── CartPage.jsx
│   ├── Checkout/
│   │   └── CheckoutPage.jsx      // Leads to (POST /orders)
│   ├── Dashboard/
│   │   ├── User/
│   │   │   └── MyOrdersPage.jsx    // (GET /orders/:email)
│   │   └── Admin/
│   │       ├── AdminDashboard.jsx    // Main admin view
│   │       ├── ManageProductsPage.jsx // (POST, PATCH, DELETE /products)
│   │       └── ManageOrdersPage.jsx  // (GET /orders)
│
├── App.jsx                       // Main router setup
└── main.jsx                      // React Query, React Router setup

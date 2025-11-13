import React from "react";
import Banner from "./Banner/Banner";
import FeaturedProducts from "./FeaturedProducts/FeaturedProducts";

// Simple page transition variant
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

const HomePage = () => {
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
    >
      <Banner />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <FeaturedProducts />

        {/* Other sections like 'Shop by Category' or 'Special Offers' can be added here later */}
      </div>
    </motion.div>
  );
};

export default HomePage;

import React, { useState } from "react";
import { FiSearch, FiX } from "react-icons/fi";

// This component will eventually take props like:
// onFilterChange={handleFilter}, onSearch={handleSearch}, onReset={handleReset}
// categoriesList={['Electronics', 'Books', 'Clothing']}

const SearchFilter = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  // Placeholder categories - this should come from props or a query
  const categories = [
    "Electronics",
    "Books",
    "Clothing",
    "Home Goods",
    "Sports",
  ];

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call a prop function
    console.log({ searchTerm, selectedCategory, minPrice, maxPrice });
    // e.g., onSearch(searchTerm);
  };

  const handleFilterSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would call a prop function
    console.log({ searchTerm, selectedCategory, minPrice, maxPrice });
    // e.g., onFilterChange({ category: selectedCategory, minPrice, maxPrice });
  };

  const handleReset = () => {
    setSearchTerm("");
    setSelectedCategory("");
    setMinPrice("");
    setMaxPrice("");
    // e.g., onReset();
  };

  const inputStyles =
    "block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white sm:text-sm";
  const labelStyles =
    "block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1";

  return (
    <div className="p-4 bg-gray-50 dark:bg-gray-800 rounded-lg shadow-sm mb-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="mb-4">
        <label htmlFor="search" className={labelStyles}>
          Search by Name
        </label>
        <div className="relative flex items-center">
          <input
            type="search"
            id="search"
            name="search"
            className={`${inputStyles} pr-10`}
            placeholder="Search for products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button
            type="submit"
            className="absolute right-0 top-0 bottom-0 px-3 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
            aria-label="Search"
          >
            <FiSearch className="w-5 h-5" />
          </button>
        </div>
      </form>

      {/* Filter Form */}
      <form onSubmit={handleFilterSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Category Filter */}
          <div>
            <label htmlFor="category" className={labelStyles}>
              Category
            </label>
            <select
              id="category"
              name="category"
              className={inputStyles}
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>

          {/* Min Price */}
          <div>
            <label htmlFor="minPrice" className={labelStyles}>
              Min Price
            </label>
            <input
              type="number"
              id="minPrice"
              name="minPrice"
              className={inputStyles}
              placeholder="0"
              min="0"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>

          {/* Max Price */}
          <div>
            <label htmlFor="maxPrice" className={labelStyles}>
              Max Price
            </label>
            <input
              type="number"
              id="maxPrice"
              name="maxPrice"
              className={inputStyles}
              placeholder="Any"
              min="0"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3 pt-2">
          <button
            type="button"
            onClick={handleReset}
            className="flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:bg-gray-600 dark:text-gray-200 dark:border-gray-500 dark:hover:bg-gray-500"
          >
            <FiX className="w-4 h-4 mr-1.5" />
            Reset
          </button>
          <button
            type="submit"
            className="flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <FiSearch className="w-4 h-4 mr-1.5" />
            Apply Filters
          </button>
        </div>
      </form>
    </div>
  );
};

export default SearchFilter;

import React from 'react';
import { FaPlusSquare, FaList, FaFolderPlus, FaBox } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ProductsNavBar = () => {
  return (
    <div className="bg-primary/85 backdrop-blur-sm shadow-lg p-4 flex flex-col sm:flex-row gap-2 sm:gap-4 items-start sm:items-center">
      {/* Products Title */}
      <div className="hidden sm:flex items-center gap-2 mr-4">
        <FaBox className="text-white text-xl" />
        <h2 className="text-white font-semibold text-lg">Products</h2>
      </div>

      {/* Navigation Links */}
      <div className="flex flex-col sm:flex-row gap-2 w-full sm:w-auto">
        <Link
          to="/dashboard/products/add"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaPlusSquare className="flex-shrink-0" />
          <span className="truncate">Add Product</span>
        </Link>

        <Link
          to="/dashboard/categories"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaList className="flex-shrink-0" />
          <span className="truncate">Categories</span>
        </Link>

        <Link
          to="/dashboard/categories/new"
          className="bg-secondary/20 hover:bg-secondary/40 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors"
        >
          <FaFolderPlus className="flex-shrink-0" />
          <span className="truncate">New Category</span>
        </Link>
      </div>
    </div>
  );
};

export default ProductsNavBar;

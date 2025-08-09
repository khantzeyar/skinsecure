/** 
 * The products will be displayed on this page.
 * - A grid showing a list of banned and approved products will be displayd
 * - The buttons below will allow you to toggle between the pages of the list.
*/
"use client";

import React, { useState, useEffect } from 'react';
import ApprovedProduct from './components/ApprovedProduct';
import CancelledProduct from './components/CancelledProduct';
import Pagination from '@mui/material/Pagination';
import Search from '@mui/icons-material/Search';
import FilterAlt from '@mui/icons-material/FilterAlt';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

export default function Home() {
  const [products, setProducts] = useState<{ id: number; type: string }[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const ingredients = [
  "MERCURY",
  "TRETINOIN",
  "CLINDAMYCIN",
  "HYDROQUINONE",
  "STEROID",
  "DIPHENHYDRAMINE",
  "METHYL SALICYLATE",
  "MENTHOL",
  "ISOPROPYL ALCOHOL",
  "AZELAIC ACID",
  "MICONAZOLE",
  "THYMOL",
  "TRIMETHOPRIM",
  "GRISEOFULVIN",
  "SULFAMETHOXAZOLE",
  "KETOCONAZOLE",
  "CHLORAMPHENICOL",
  "CHLORPHENIRAMINE",
  "METRONIDAZOLE",
  ];

  const [showAll, setShowAll] = useState(false);
  const visibleIngredients = showAll ? ingredients : ingredients.slice(0, 5);

  // Generate products
  useEffect(() => {
    const generated = Array.from({ length: 48 }, (_, index) => {
      const isApproved = Math.random() > 0.5;
      return { id: index, type: isApproved ? 'approved' : 'cancelled' };
    });
    setProducts(generated);
  }, []);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = products.slice(startIndex, endIndex);

  return (
    <div className="w-full flex flex-row gap-6 mt-38">
      {/* Filters Card */}
      <div className="w-64 h-fit border shadow-md rounded border-gray-200 p-4 ml-6">
        <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
          <FilterAlt className="text-black"/>
          Filter Products
        </h2>
        {/* Search Field */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Search Products</h3>
          <div className="relative">
            <Search
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" 
              fontSize="small" 
            />
            <input
              type="text"
              placeholder="Product name, notif no..."
              className="w-full border border-gray-300 rounded pl-10 pr-3 py-2 text-sm" 
            />
          </div>
        </div>
        {/* Divider Line */}
        <div className="h-px bg-gray-200 mb-4 mt-6"></div>
        {/* Approval Status */}
        <div className="mb-4">
          <h3 className="font-semibold text-sm mb-2">Approval Status</h3>
          <div className="flex flex-col gap-1 text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Approved
            </label>
            <label className="flex items-center gap-2">
              <input type="checkbox" /> Cancelled
            </label>
          </div>
        </div>
        {/* Ingredient Profile */}
        <div className="mb-1">
          <h3 className="font-semibold text-sm mb-2">High Risk Ingredients</h3>
          <div className="flex flex-col gap-1 text-sm">
            {visibleIngredients.map((ingredient) => (
              <label key={ingredient} className="flex items-center gap-2">
                <input type="checkbox" name={ingredient} value={ingredient} />
                {ingredient}
              </label>
            ))}
            {ingredients.length > 5 && (
              <button
                className="flex items-center gap-1 mt-2 text-blue-500 text-sm cursor-pointer relative right-0.5"
                onClick={() => setShowAll(!showAll)}
                type="button"
              >
                {showAll ? (
                  <>
                    <KeyboardArrowUp fontSize="small" className="text-black" />
                    See less
                  </>
                ) : (
                  <>
                    <KeyboardArrowDown fontSize="small" className="text-black" />
                    See more
                  </>
                )}
              </button>
            )}
          </div>
        </div>
      </div>
      {/* Product Grid*/}
      <div className="flex flex-col items-center flex-1 mr-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentProducts.map((product) =>
            product.type === 'approved' ? (
              <ApprovedProduct key={product.id} />
            ) : (
              <CancelledProduct key={product.id} />
            )
          )}
        </div>
        <Pagination
          className="py-6"
          count={Math.ceil(products.length / itemsPerPage)}
          shape="rounded"
          size="large"
          page={page}
          onChange={handleChange}
        />
      </div>
    </div>
  );
}

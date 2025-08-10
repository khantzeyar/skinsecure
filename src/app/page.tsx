/** 
 * The products will be displayed on this page.
 * - A grid showing a list of banned and approved products will be displayd
 * - The buttons below will allow you to toggle between the pages of the list.
 * - Options for filtering the products will be given on the left.
*/
"use client";

import React, { useState, useEffect } from 'react';
import ApprovedProduct from './components/ApprovedProduct';
import CancelledProduct from './components/CancelledProduct';
import Pagination from '@mui/material/Pagination';
import Search from '@mui/icons-material/Search';
import SearchOff from '@mui/icons-material/SearchOff';
import FilterAlt from '@mui/icons-material/FilterAlt';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';

export default function Home() {
  const [page, setPage] = useState(1);
  const itemsPerPage = 12;

  const [ingredients, setIngredients] = useState<string[]>([]);
  const [showAll, setShowAll] = useState(false);
  const visibleIngredients = showAll ? ingredients : ingredients.slice(0, 5);

  const [showApproved, setShowApproved] = useState(false);
  const [showCancelled, setShowCancelled] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedIngredients, setSelectedIngredients] = useState<string[]>([]);

  // New state for ingredient risks
  const [ingredientRisks, setIngredientRisks] = useState<Record<string, string>>({});

  // Unified product type
  interface UnifiedProduct {
    notif_no: string;
    product_name: string;
    status: "approved" | "cancelled";
    manufacturer?: string;
    ingredients?: string[];
  }

  const [allProducts, setAllProducts] = useState<UnifiedProduct[]>([]);

  // Fetch and combine products
  useEffect(() => {
    async function fetchProductsAndRisks() {
      try {
        // Fetch approved products
        const approvedRes = await fetch("/api/approved-products");
        if (!approvedRes.ok) throw new Error("Failed to fetch approved products");
        const approvedData: { notif_no: string; product: string }[] = await approvedRes.json();

        // Fetch cancelled products
        const cancelledRes = await fetch("/api/cancelled-products");
        if (!cancelledRes.ok) throw new Error("Failed to fetch cancelled products");
        const cancelledData: {
          notif_no: string;
          product: string;
          holder: string;
          manufacturer: string;
          substance_detected: string | null;
        }[] = await cancelledRes.json();

        // Extract unique ingredients for filter
        const uniqueIngredients = Array.from(
          new Set(
            cancelledData.flatMap((item) =>
              item.substance_detected
                ? item.substance_detected
                    .split(/,| AND | & /i)
                    .map((s) => s.trim().toUpperCase())
                : []
            )
          )
        ).sort();
        setIngredients(uniqueIngredients);

        // Map approved products
        const approvedProducts: UnifiedProduct[] = approvedData.map((item) => ({
          notif_no: item.notif_no,
          product_name: item.product,
          status: "approved",
        }));

        // Map cancelled products (parse ingredients)
        const cancelledProducts: UnifiedProduct[] = cancelledData.map((item) => ({
          notif_no: item.notif_no,
          product_name: item.product,
          status: "cancelled",
          manufacturer: item.manufacturer,
          ingredients: item.substance_detected
            ? item.substance_detected
                .split(/,| AND | & /i)
                .map((s) => s.trim().toUpperCase())
            : [],
        }));

        // Combine both arrays
        setAllProducts([...approvedProducts, ...cancelledProducts]);

        // Fetch ingredient risks
        const risksRes = await fetch("/api/ingredients");
        if (!risksRes.ok) throw new Error("Failed to fetch ingredient risks");
        const risksData: { ingredient: string; risk_explanation: string }[] = await risksRes.json();

        // Build a mapping: INGREDIENT (UPPERCASE) -> risk_explanation
        const riskMap: Record<string, string> = {};
        for (const row of risksData) {
          riskMap[row.ingredient.toUpperCase()] = row.risk_explanation;
        }
        setIngredientRisks(riskMap);
      } catch (err) {
        console.error(err);
      }
    }
    fetchProductsAndRisks();
  }, []);

  // Filtering logic
  let filteredProducts = allProducts;

  // Filter by approval status
  if (showApproved || showCancelled) {
    filteredProducts = filteredProducts.filter((product) =>
      (showApproved && product.status === "approved") ||
      (showCancelled && product.status === "cancelled")
    );
  }

  // Filter by search term
  if (searchTerm.trim() !== "") {
    const lower = searchTerm.trim().toLowerCase();
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.product_name.toLowerCase().includes(lower) ||
        product.notif_no.toLowerCase().includes(lower)
    );
  }

  // Filter by selected ingredients
  if (selectedIngredients.length > 0) {
    filteredProducts = filteredProducts.filter(
      (product) =>
        product.status === "cancelled" &&
        product.ingredients &&
        product.ingredients.some((ing) => selectedIngredients.includes(ing))
    );
  } else if (showApproved || showCancelled) {
    // Filter by approval status if no ingredients are selected
    filteredProducts = filteredProducts.filter((product) =>
      (showApproved && product.status === "approved") ||
      (showCancelled && product.status === "cancelled")
    );
  }

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  // Pagination
  const startIndex = (page - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentProducts = filteredProducts.slice(startIndex, endIndex);

  const handleIngredientChange = (ingredient: string) => {
    setSelectedIngredients((prev) =>
      prev.includes(ingredient)
        ? prev.filter((i) => i !== ingredient)
        : [...prev, ingredient]
    );
    setPage(1);
  };

  // Reset page when filters change
  useEffect(() => {
    setPage(1);
  }, [showApproved, showCancelled, searchTerm, selectedIngredients]);

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
              value={searchTerm}
              onChange={e => {
                setSearchTerm(e.target.value);
                setPage(1); // Reset to first page on search
              }}
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
              <input
                type="checkbox"
                checked={showApproved}
                onChange={() => setShowApproved((prev) => !prev)}
              /> Approved
            </label>
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={showCancelled}
                onChange={() => setShowCancelled((prev) => !prev)}
              /> Cancelled
            </label>
          </div>
        </div>
        {/* Ingredient Profile */}
        <div className="mb-1">
          <h3 className="font-semibold text-sm mb-2">High Risk Ingredients</h3>
          <div className="flex flex-col gap-1 text-sm">
            {visibleIngredients.map((ingredient) => (
              <label key={ingredient} className="flex items-center gap-2">
                <input
                  type="checkbox"
                  name={ingredient}
                  value={ingredient}
                  checked={selectedIngredients.includes(ingredient)}
                  onChange={() => handleIngredientChange(ingredient)}
                />
                {ingredient}
              </label>
            ))}
            {ingredients.length > 5 && (
              <button
                className="flex items-center gap-1 mt-2 text-blue-500 text-sm cursor-pointer relative right-1"
                onClick={() => setShowAll(!showAll)}
                type="button">
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
        {currentProducts.length === 0 ? (
          <div className="w-full flex flex-col items-center text-gray-500 py-20 text-lg">
            <SearchOff sx={{ fontSize: 60 }} className="mb-4" />
            No products found.
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {currentProducts.map((product) =>
                product.status === "approved" ? (
                  <ApprovedProduct
                    key={product.notif_no}
                    product={{
                      notif_no: product.notif_no,
                      product_name: product.product_name,
                    }}
                  />
                ) : (
                  <CancelledProduct
                    key={product.notif_no}
                    product={{
                      notif_no: product.notif_no,
                      product_name: product.product_name,
                      substance_detected: product.ingredients ? product.ingredients.join(", ") : null,
                    }}
                    ingredientRisks={ingredientRisks}
                  />
                )
              )}
            </div>
            <Pagination
              className="py-6"
              count={Math.ceil(filteredProducts.length / itemsPerPage)}
              shape="rounded"
              size="large"
              page={page}
              onChange={handleChange}
            />
          </>
        )}
      </div>
    </div>
  );
}

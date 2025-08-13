/** 
 * The products will be displayed on this page.
 * - A grid showing a list of banned and approved products will be displayd
 * - The buttons below will allow you to toggle between the pages of the list.
 * - Options for filtering the products will be given on the left.
*/
"use client";

import React, { useState, useEffect, useCallback } from 'react';
import ApprovedProduct from './components/ApprovedProduct';
import CancelledProduct from './components/CancelledProduct';
import Pagination from '@mui/material/Pagination';
import Search from '@mui/icons-material/Search';
import SearchOff from '@mui/icons-material/SearchOff';
import FilterAlt from '@mui/icons-material/FilterAlt';
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUp from '@mui/icons-material/KeyboardArrowUp';
import CircularProgress from '@mui/material/CircularProgress';

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

  // Unified product type for combined_products
  interface UnifiedProduct {
    notif_no: string;
    product: string;
    company: string;
    substance_detected: string | null;
    status: "approved" | "cancelled";
    ingredients?: string[];
  }

  const [allProducts, setAllProducts] = useState<UnifiedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  // Fetch and combine products
  useEffect(() => {
    async function fetchProductsAndRisks() {
      setLoading(true);
      try {
        // Build query params
        const params = new URLSearchParams();
        params.set("page", page.toString());
        params.set("pageSize", itemsPerPage.toString());
        if (showApproved && !showCancelled) params.set("status", "approved");
        if (showCancelled && !showApproved) params.set("status", "cancelled");
        if (searchTerm.trim()) params.set("search", searchTerm.trim());
        if (selectedIngredients.length > 0) {
          params.set("ingredient", selectedIngredients.join(","));
          params.set("status", "cancelled");
        }

        // Fetch paginated, filtered products
        const combinedRes = await fetch(`/api/combined-products?${params.toString()}`);
        if (!combinedRes.ok) throw new Error("Failed to fetch combined products");
        const { products: combinedData, total } = await combinedRes.json();

        // Determine status and parse ingredients
        const products: UnifiedProduct[] = combinedData.map((item: UnifiedProduct) => {
          const isCancelled = !!item.substance_detected && item.substance_detected.trim() !== "";
          return {
            ...item,
            status: isCancelled ? "cancelled" : "approved",
            ingredients: isCancelled
              ? item.substance_detected
                  ?.split(/,| AND | & /i)
                  .map((s: string) => s.trim().toUpperCase())
              : [],
          };
        });

        setAllProducts(products);
        setTotalProducts(total);

        // Fetch ingredient list from /api/ingredients
        const ingredientsRes = await fetch("/api/ingredients");
        if (!ingredientsRes.ok) throw new Error("Failed to fetch ingredients");
        const ingredientsData: { ingredient: string }[] = await ingredientsRes.json();
        setIngredients(ingredientsData.map(row => row.ingredient));

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
      } finally {
        setLoading(false);
      }
    }
    fetchProductsAndRisks();
  }, [page, itemsPerPage, showApproved, showCancelled, searchTerm, selectedIngredients]);

  const handleChange = (_event: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

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
        <div className="flex flex-col justify-between items-center w-full min-h-[600px]">
          {loading ? (
            <div className="w-full flex flex-col items-center text-gray-500 py-20 text-lg">
              <CircularProgress className="mb-4" />
              Loading Products...
            </div>
            // If the product length is zero OR Approved and an ingredient are selected -> Show no products
          ) : allProducts.length === 0 || (selectedIngredients.length > 0 && showApproved && !showCancelled) ? (
            <div className="w-full flex flex-col items-center text-gray-500 py-20 text-lg">
              <SearchOff sx={{ fontSize: 60 }} className="mb-4" />
              No products found.
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full flex-1">
                {allProducts.map((product) =>
                  product.status === "approved" ? (
                    <ApprovedProduct
                      key={product.notif_no}
                      product={{
                        notif_no: product.notif_no,
                        product_name: product.product,
                      }}
                    />
                  ) : (
                    <CancelledProduct
                      key={product.notif_no}
                      product={{
                        notif_no: product.notif_no,
                        product_name: product.product,
                        substance_detected: product.ingredients ? product.ingredients.join(", ") : null,
                      }}
                      ingredientRisks={ingredientRisks}
                    />
                  )
                )}
              </div>
              <Pagination
                className="py-6"
                count={Math.ceil(totalProducts / itemsPerPage)}
                shape="rounded"
                size="large"
                page={page}
                onChange={handleChange}
              />
            </>
          )}
        </div>
      </div>
    </div>
  );
}

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

export default function Home() {
  const [products, setProducts] = useState<{ id: number; type: string }[]>([]);
  const [page, setPage] = useState(1);
  const itemsPerPage = 6;

  // Generate products
  useEffect(() => {
    const generated = Array.from({ length: 30 }, (_, index) => {
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
    <div className="w-full flex flex-col items-center mt-38">
      {/* Product Grid*/}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentProducts.map((product) =>
          product.type === 'approved' ? (
            <ApprovedProduct key={product.id} />
          ) : (
            <CancelledProduct key={product.id} />
          )
        )}
      </div>
      <Pagination className="py-6"
        count={Math.ceil(products.length / itemsPerPage)}
        shape="rounded"
        size="large"
        page={page}
        onChange={handleChange}
      />
    </div>
  );
}

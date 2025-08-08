/** 
 * The products will be displayed on this page.
 * - A grid showing a list of banned and approved products will be displayd
*/

import React from 'react'
import ApprovedProduct from './components/ApprovedProduct';
import CancelledProduct from './components/CancelledProduct';

export default function Home() {
  // Generate 18 random products 
  const products = Array.from({ length: 18 }, (_, index) => {
    const isApproved = Math.random() > 0.5; 
    return { id: index, type: isApproved ? 'approved' : 'cancelled' };
  });

  return (
    <div className='w-full flex justify-center mt-38'>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Map products to approved or cancelled.*/}
        {products.map((product) =>
          product.type === 'approved' ? (
            <ApprovedProduct key={product.id} />
          ) : (
            <CancelledProduct key={product.id} />
          )
        )}
      </div>
    </div>
  );
}

import React from 'react'
import ApprovedProduct from './components/ApprovedProduct';
import CancelledProduct from './components/CancelledProduct';

export default function Home() {
  return (
    <div className='w-full flex justify-center mt-38'>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ApprovedProduct></ApprovedProduct>
        <CancelledProduct></CancelledProduct>
      </div>
    </div>
  );
}

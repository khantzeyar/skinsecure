/** 
 * This component is used to represent the cancelled products in the dataset.
 * - TO BE IMPLEMENTED: Similar products button
 * - TO BE IMPLEMENTED: Risk analysis button (?)
*/
import React, { useState } from 'react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import Overlay from './Overlay'; 

interface CancelledProductCard {
  product: {
    notif_no: string;
    product_name: string;
    substance_detected: string | null;
  };
}

const CancelledProduct: React.FC<CancelledProductCard> = ({ product }) => {
  const [showOverlay, setShowOverlay] = useState(false);

  // Prepare ingredients array
  const ingredients = product.substance_detected
    ? product.substance_detected
        .split(/,| AND | & /i)
        .map((s) => s.trim().toUpperCase())
    : [];

  return (
    <>
      <div className="flex flex-col justify-between items-center w-full max-w-[280px] h-77 
      border shadow-md rounded border-gray-200 overflow-hidden
      will-change-transform will-change-width">
        {/* Header */}
        <div className='w-full flex flex-col items-center py-1' style={{ backgroundColor: '#D50000' }}>
          <h1 className='font-extrabold text-white'>CANCELLED</h1>
        </div>

        {/* Middle content - Product Info */}
        <div className="flex flex-col justify-center items-center min-h-[120px] text-center px-6">
          <h1 className='font-bold py-2 text-[16px]'>{product.product_name}</h1>
          <h1 className='font-normal text-[14px]'>Notif No. - {product.notif_no}</h1>
        </div>

        {/* Divider, Risk Ingredients & Help Icon */}
        <div className="w-full px-7 flex-1 flex flex-col justify-center">
          {/* Divider Line */}
          <div className="h-px bg-gray-200"></div>
          <h1 className='font-bold text-center text-[14px] py-2'>High Risk Ingredients</h1>
          {/* Ingredients List with Help Icon */}
          <div className="relative flex items-center justify-center">
            <ul className="list-disc list-inside text-[10px] mb-2 max-h-[80px] overflow-auto">
              {ingredients.length > 0 ? (
                ingredients.map((ingredient, idx) => (
                  <li key={idx}>{ingredient}</li>
                ))
              ) : (
                <li className="text-gray-400 italic">No high risk ingredients</li>
              )}
            </ul>
            <HelpOutlineIcon
              className="text-gray-300 ml-2 cursor-pointer"
              fontSize="large"
              onClick={() => setShowOverlay(true)}
              titleAccess="Show risk analysis"
            />
          </div>
        </div>

        {/* Similar Products Button */}
        <div className="flex justify-center mb-6">
          <button className="text-blue-500 cursor-pointer text-[14px]">
            Similar Products
          </button>
        </div>
      </div>

      {showOverlay && (
        <Overlay onClose={() => setShowOverlay(false)}>
          {/* Here you can display risk explanation, for now just show ingredients */}
          <div className="p-4">
            <ul className="list-disc list-inside text-sm mx-5">
              {ingredients.length > 0 ? (
                ingredients.map((ing, i) => <li key={i}>{ing}</li>)
              ) : (
                <li>No high risk ingredients</li>
              )}
            </ul>
          </div>
        </Overlay>
      )}
    </>
  );
};

export default CancelledProduct;

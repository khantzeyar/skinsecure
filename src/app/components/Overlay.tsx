/* This component is used to create the pop up for the risk explanations
- The user can close the pop up through either the close button or through the Got It button
- The user can also click outside of the pop up to close it as well
- Explanations regarding the risks will be provided for each ingredient
*/
import React, { useEffect } from 'react';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import WarningIcon from '@mui/icons-material/Warning';

interface OverlayProps {
  onClose: () => void;
}

const Overlay = ({ onClose }: OverlayProps) => {
  useEffect(() => {
    const originalStyle = window.getComputedStyle(document.body).overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = originalStyle;
    };
  }, []);

  return (
    <div
      className="fixed inset-0 flex justify-center items-center z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.8)' }} // semi-transparent black background
      onClick={onClose}>
      <div
        className="bg-white p-6 w-full max-w-lg mx-4 relative"
        onClick={e => e.stopPropagation()}>
        <IconButton
          onClick={onClose}
          aria-label="Close overlay"
          size="small"
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            color: 'gray.600',
            '&:hover': { color: 'gray.900' },
          }}>
          <CloseIcon fontSize="small" />
        </IconButton>
        <div className="flex items-center justify-center mb-3">
          <WarningIcon sx={{ color: '#FFBF00', fontSize: 50}}/>
        </div>
        {/* Risk Information */}
        <h2 className="text-2xl font-bold mb-4 text-center">Ingredient Risks</h2>
        <p className="text-sm mb-4 text-center py-1">
          The following ingredients were included in the product: 
        </p>
        <ul className="list-disc list-inside text-sm px-10 mb-2 flex-1">
            <li>Ingredient 1: Explanation</li>
            <li>Ingredient 2: Explanation</li>
            <li>Ingredient 3: Explanation</li>
            <li>Ingredient 4: Explanation</li>
            <li>Ingredient 5: Explanation</li>
        </ul>
        {/* Confirmation Button */}
        <div className="flex justify-center mt-8 mb-6">
            <button
            onClick={onClose}
            className="w-48 bg-black text-white py-2 px-6 rounded-sm
             hover:bg-gray-800 transition-colors cursor-pointer">
                Got It
            </button>
        </div>
      </div>
    </div>
  );
};

export default Overlay;

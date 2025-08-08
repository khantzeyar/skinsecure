/** 
 * This component is used to represent the cancelled products in the dataset.
 * - TO BE IMPLEMENTED: Similar products button
 * - TO BE IMPLEMENTED: Risk analysis button (?)
*/
import React from 'react'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

const CancelledProduct = () => {
  return (
    <div className='flex flex-col items-center w-70 h-77 
    border shadow-md rounded border-gray-200 overflow-hidden'> 
        {/* Header */}
        <div className='w-full flex flex-col items-center py-1' style={{ backgroundColor: '#D50000' }}>
            <h1 className='font-extrabold text-white'>CANCELLED</h1>
        </div>
        <h1 className='font-bold py-5'>Product Name</h1>
        <h1 className='font-normal text-[14px]'>Notif No. - NOT200603276K</h1>
        <div className="w-full px-7">
            {/* Divider Line */}
            <div className="h-px bg-gray-200 mt-5"></div>
            <h1 className='font-bold text-center text-[14px] py-2'>High Risk Ingredients</h1>
            {/* Ingredients List */}
            <div className="relative flex items-center">
            <ul className="list-disc list-inside text-[10px] mb-2 flex-1">
                <li>Ingredient 1</li>
                <li>Ingredient 2</li>
                <li>Ingredient 3</li>
                <li>Ingredient 4</li>
                <li>Ingredient 5</li>
            </ul>
            <HelpOutlineIcon className="text-gray-400 ml-2 cursor-pointer" fontSize="large" />
            </div>
            {/* Similar Products Button */}
            <div className="flex justify-center">
                <button className="text-blue-500 cursor-pointer text-[14px]"> 
                    Similar Products 
                </button>
            </div>
        </div>
    </div>
  )
}

export default CancelledProduct
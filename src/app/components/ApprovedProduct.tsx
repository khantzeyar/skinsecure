/** 
 * This component is used to represent the approved products in the dataset.
 * - TO BE IMPLEMENTED: Similar products button
*/
import React from 'react'

const ApprovedProduct = () => {
  return (
    <div className="flex flex-col justify-between items-center w-full max-w-[280px] h-77 
    border shadow-md rounded border-gray-200 overflow-hidden
    will-change-transform will-change-width">
        <div className="w-full">
            {/* Header */}
            <div className='w-full flex flex-col items-center py-1' style={{ backgroundColor: '#2E7D32' }}>
                <h1 className='font-extrabold text-white'>APPROVED</h1>
            </div>
            <div className="text-center">
                <h1 className='font-bold py-5'>Product Name</h1>
                <h1 className='font-normal text-[14px]'>Notif No. - NOT200603276K</h1>
            </div>
            <div className="w-full px-7">
                {/* Divider Line */}
                <div className="h-px bg-gray-200 mt-5"></div>
                <h1 className='py-9 text-center text-[14px]'> 
                    The product is safe from any harmful ingredients!
                </h1>
            </div>
        </div>
        {/* Similar Products Button */}
        <div className="flex justify-center mb-6">
            <button className="text-blue-500 cursor-pointer text-[14px]"> 
                Similar Products 
            </button>
        </div>
    </div>
  )
}

export default ApprovedProduct
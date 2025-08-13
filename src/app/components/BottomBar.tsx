import React from 'react';

const BottomBar = () => {
  return (
    <footer className="w-full bg-gray-100 border-t border-gray-300 py-4 px-2 text-center text-sm text-gray-700">
      <div className="mb-2">
        Data is based on the Malaysian government&#39;s health department notifications.<br />
        <a
          href="https://data.moh.gov.my/data-catalogue/cosmetic_notifications_cancelled"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Cancelled Products
        </a>
        {" | "}
        <a
          href="https://data.moh.gov.my/data-catalogue/cosmetic_notifications"
          className="text-blue-600 underline"
          target="_blank"
          rel="noopener noreferrer"
        >
          Approved Products
        </a>
      </div>
      <div className="text-xs text-gray-500">
        © 2025 by <span className="font-bold">TM07 - Thredloom</span>. All rights reserved.
      </div>
    </footer>
  );
};

export default BottomBar;
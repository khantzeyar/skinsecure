import React, { useEffect, useState } from 'react';
import CircularProgress from '@mui/material/CircularProgress';

const Loading = () => {
  const [tip, setTip] = useState<string>("");

  useEffect(() => {
    fetch('/tips.json')
      .then(res => res.json())
      .then((tips: string[]) => {
        if (Array.isArray(tips) && tips.length > 0) {
          setTip(tips[Math.floor(Math.random() * tips.length)]);
        }
      });
  }, []);

  return (
    <div className="w-full flex flex-col items-center text-gray-500 py-20 text-lg">
      <CircularProgress className="mb-4" />
      Loading Products...
      <div className="mt-15 bg-yellow-50 border border-yellow-300 rounded px-6 py-4 text-base text-yellow-800 shadow-sm max-w-md text-center">
        <span className="font-semibold">Tip:</span> {tip}
      </div>
    </div>
  );
};

export default Loading;
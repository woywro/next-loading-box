import React from 'react';

export const ProductSkeleton: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 w-full bg-white h-full p-4 z-50">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
        </div>
        <div className="w-1/2 space-y-4">
          <div className="w-3/4 h-8 bg-gray-200 rounded"></div>
          <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
          <div className="w-full h-24 bg-gray-200 rounded"></div>
          <div className="w-1/3 h-10 bg-gray-200 rounded"></div>
        </div>
      </div>
      <div className="mt-8 space-y-4">
        <div className="w-1/4 h-6 bg-gray-200 rounded"></div>
        <div className="space-y-2">
          {[...Array(3)].map((_, i) => (
            <div key={i} className="w-full h-4 bg-gray-200 rounded"></div>
          ))}
        </div>
      </div>
    </div>
  );
};

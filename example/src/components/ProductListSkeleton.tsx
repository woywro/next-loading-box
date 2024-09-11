import React from 'react';

export const ProductListSkeleton: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 w-full bg-white h-full p-4 z-50 space-y-4">
      <div className="h-8 bg-gray-200 rounded w-1/4"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[...Array(6)].map((_, index) => (
          <div key={index} className="border p-4 rounded-lg space-y-2">
            <div className="h-40 bg-gray-200 rounded"></div>
            <div className="h-6 bg-gray-200 rounded w-3/4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

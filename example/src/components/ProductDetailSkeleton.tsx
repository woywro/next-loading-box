import React from 'react';

export const ProductDetailSkeleton: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 w-full bg-white h-full p-4 z-50">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <div className="bg-gray-200 w-full h-96 rounded"></div>
        </div>
        <div className="w-1/2 space-y-4">
          <div className="h-8 bg-gray-200 rounded w-3/4"></div>
          <div className="h-6 bg-gray-200 rounded w-1/4"></div>
          <div className="h-20 bg-gray-200 rounded"></div>
          <div className="h-10 bg-gray-200 rounded w-1/3"></div>
        </div>
      </div>
      <div className="mt-8">
        <div className="h-6 bg-gray-200 rounded w-1/4 mb-4"></div>
        <div className="space-y-2">
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-full"></div>
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>
        </div>
      </div>
    </div>
  );
};

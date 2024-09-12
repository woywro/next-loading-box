import React from 'react';

export const BlogPostSkeleton: React.FC = () => {
  return (
    <div className="absolute left-0 top-0 w-full bg-white h-full p-4 z-50">
      <div className="w-3/4 h-8 bg-gray-200 rounded mb-2"></div>
      <div className="w-1/4 h-4 bg-gray-200 rounded mb-4"></div>
      <div className="w-full h-64 bg-gray-200 rounded mb-4"></div>
      <div className="space-y-4">
        {[...Array(3)].map((_, i) => (
          <div key={i} className="space-y-2">
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-full h-4 bg-gray-200 rounded"></div>
            <div className="w-3/4 h-4 bg-gray-200 rounded"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

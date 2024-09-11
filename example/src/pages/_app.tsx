import { Header } from '@/components/Header';
import { BlogPostSkeleton } from '@/components/blogPostSkeleton';
import { ProductSkeleton } from '@/components/productSkeleton';
import '@/styles/globals.css';
import { LoadingBox } from 'next-loading-box';
import type { AppProps } from 'next/app';
import { useEffect, useState } from 'react';

export default function App({ Component, pageProps }: AppProps) {
  const [showTopLoading, setShowTopLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);
  const [showSkeleton, setShowSkeleton] = useState(false);

  useEffect(() => {
    if (showSkeleton) {
      setShowTopLoading(false);
      setShowSpinner(false);
    }
  }, [showSkeleton]);

  const handleSkeletonChange = (value: boolean) => {
    setShowSkeleton(value);
    if (value) {
      setShowTopLoading(false);
      setShowSpinner(false);
    }
  };

  const handleOtherLoadersChange = (
    setter: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    return (value: boolean) => {
      setter(value);
      if (value) {
        setShowSkeleton(false);
      }
    };
  };

  const loadingComponents = [
    { path: '/blogPost', component: <BlogPostSkeleton /> },
    { path: '/product/[id]', component: <ProductSkeleton /> },
    // Add more path-specific loading components here
  ];

  return (
    <div className="bg-white min-h-screen flex flex-col items-center justify-center p-4">
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showTopLoading}
            onChange={(e) =>
              handleOtherLoadersChange(setShowTopLoading)(e.target.checked)
            }
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="text-sm">Top Loading</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showSpinner}
            onChange={(e) =>
              handleOtherLoadersChange(setShowSpinner)(e.target.checked)
            }
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="text-sm">Spinner</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showSkeleton}
            onChange={(e) => handleSkeletonChange(e.target.checked)}
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="text-sm">Skeleton</span>
        </label>
      </div>
      <div className="w-full max-w-[600px] aspect-square mx-auto">
        <div className="w-full h-full shadow-2xl subpixel-antialiased rounded border-black flex flex-col">
          <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black">
            <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="mx-auto pr-16" id="terminaltitle">
              <p className="text-center text-sm">LoadingBox</p>
            </div>
          </div>
          <div className="flex flex-col text-xs relative flex-grow overflow-auto">
            {showTopLoading && (
              <div className="absolute z-10 h-1 left-0 top-0 w-full">
                <LoadingBox
                  loadingComponent={
                    <div className="w-full">
                      <div className="h-0.5 w-full bg-pink-100 overflow-hidden">
                        <div className="animate-progress w-full h-full bg-pink-500 origin-left-right"></div>
                      </div>
                    </div>
                  }
                />
              </div>
            )}
            {showSpinner && (
              <div className="absolute right-1 bottom-1">
                <LoadingBox
                  loadingComponent={
                    <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-pink-500 border-t-transparent"></div>
                  }
                />
              </div>
            )}
            <Header />
            <div className="relative overflow-auto flex-grow">
              {showSkeleton && (
                <LoadingBox loadingComponent={loadingComponents}></LoadingBox>
              )}
              <Component {...pageProps} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

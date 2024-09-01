import { useState } from 'react';
import { Header } from '@/components/Header';
import '@/styles/globals.css';
import type { AppProps } from 'next/app';
import { LoadingBox } from 'next-loading-box';

export default function App({ Component, pageProps }: AppProps) {
  // State to manage the toggles for animations
  const [showTopLoading, setShowTopLoading] = useState(true);
  const [showSpinner, setShowSpinner] = useState(true);

  return (
    <div className="bg-white h-screen flex flex-col items-center">
      <div className="fixed top-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-4">
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showTopLoading}
            onChange={() => setShowTopLoading((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="text-sm">Top Loading</span>
        </label>
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            checked={showSpinner}
            onChange={() => setShowSpinner((prev) => !prev)}
            className="form-checkbox h-4 w-4 text-pink-600"
          />
          <span className="text-sm">Spinner</span>
        </label>
      </div>
      <div className="w-1/2 mx-auto flex-1 flex items-center">
        <div className="w-[600px] shadow-2xl subpixel-antialiased rounded mx-auto border-black">
          <div className="flex items-center h-6 rounded-t bg-gray-100 border-b border-gray-500 text-center text-black">
            <div className="flex ml-2 items-center text-center border-red-900 bg-red-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="ml-2 border-yellow-900 bg-yellow-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="ml-2 border-green-900 bg-green-500 shadow-inner rounded-full w-3 h-3"></div>
            <div className="mx-auto pr-16" id="terminaltitle">
              <p className="text-center text-sm">LoadingBox</p>
            </div>
          </div>
          <div className="h-full flex flex-col text-xs relative">
            {showTopLoading && (
              //Global Top Loading
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
              // Global Spinner
              <div className="absolute right-1 bottom-1">
                <LoadingBox
                  loadingComponent={
                    <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-pink-500 border-t-transparent"></div>
                  }
                />
              </div>
            )}
            <Header />
            <Component {...pageProps} />
          </div>
        </div>
      </div>
    </div>
  );
}

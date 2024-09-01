import { LoadingBox } from 'next-loading-box';
import Link from 'next/link';

export const Header = () => {
  return (
    <header>
      <nav
        className="flex items-center justify-center p-6 lg:px-8  bg-white bg-opacity-30 shadow-sm backdrop-filter backdrop-blur-lg"
        aria-label="Global"
      >
        <div className="hidden lg:flex lg:gap-x-12">
          {/* with Loader */}
          <LoadingBox
            loadingComponent={
              <div className="absolute w-full h-full">
                <span className="relative flex h-full w-full">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-pink-400 opacity-75"></span>
                </span>
              </div>
            }
          >
            <Link
              href="/slowLoadingPage"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              With Loader
            </Link>
          </LoadingBox>
          {/* Shallow With Delay */}
          <LoadingBox
            animateAfter={2000}
            shallowRouting
            loadingComponent={
              <div className="absolute w-full h-full flex justify-center items-center">
                <div className="w-3 h-3 rounded-full animate-spin border-2 border-solid border-pink-500 border-t-transparent absolute right-[-16px]"></div>
              </div>
            }
          >
            <Link
              href="slowLoadingPage"
              className="text-sm font-semibold leading-6 text-gray-900"
              shallow
            >
              Shallow With Delay
            </Link>
          </LoadingBox>
          {/* No Loader */}
          <Link
            href="slowLoadingPage"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            No Loader
          </Link>
        </div>
      </nav>
    </header>
  );
};

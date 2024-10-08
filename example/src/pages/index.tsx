/* eslint-disable react/no-unescaped-entities */
import { LoadingBox } from 'next-loading-box';
import Link from 'next/link';

export default function Home() {
  return (
    <div className="h-full w-full flex items-center flex-col justify-center gap-3 ">
      {/* Blur Background with Spinner */}
      <LoadingBox
        loadingComponent={
          <>
            <div className="absolute inset-0 w-full h-full bg-white bg-opacity-90 z-15 filter blur-sm"></div>
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <div className="w-8 h-8 rounded-full animate-spin border-4 border-solid border-pink-500 border-t-transparent"></div>
            </div>
          </>
        }
      >
        <Link
          href="/blogPost"
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
        >
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
            I'm a Single Post
          </h5>
          <p className="font-normal text-gray-700">
            This is an example of a single post that could represent a blog
            post, an article, or any other content. Click here to read more
            about this fascinating topic!
          </p>
        </Link>
      </LoadingBox>
      <Link
        href="/products"
        className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg hover:bg-gray-100"
      >
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
          /Products
        </h5>
        <p className="font-normal text-gray-700">
          This is an example of a single post that could represent a blog post,
          an article, or any other content. Click here to read more about this
          fascinating topic!
        </p>
      </Link>
    </div>
  );
}

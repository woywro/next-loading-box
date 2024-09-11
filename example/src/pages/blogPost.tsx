import { useRouter } from 'next/router';
import React from 'react';

const BlogPost: React.FC = () => {
  const router = useRouter();

  return (
    <div className="w-full p-4">
      <h1 className="text-3xl font-bold mb-2">Sample Blog Post</h1>
      <p className="text-gray-600 mb-4">Posted on May 1, 2023</p>
      <img
        src="https://via.placeholder.com/800x400"
        alt="Blog post cover"
        className="w-full h-auto mb-4 rounded"
      />
      <div className="space-y-4">
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam
          euismod, nisi vel consectetur interdum, nisl nunc egestas nunc, vitae
          tincidunt nisl nunc euismod nunc.
        </p>
        <p>
          Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
          enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi
          ut aliquip ex ea commodo consequat.
        </p>
        <p>
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum
          dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non
          proident, sunt in culpa qui officia deserunt mollit anim id est
          laborum.
        </p>
      </div>
    </div>
  );
};

export default BlogPost;

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 3000));
  return { props: {} };
};

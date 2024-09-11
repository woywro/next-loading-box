import React from 'react';
import { useRouter } from 'next/router';

const ProductDetail: React.FC = () => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="w-full p-4">
      <div className="flex space-x-4">
        <div className="w-1/2">
          <img
            src={`https://via.placeholder.com/400x400?text=Product+${id}`}
            alt={`Product ${id}`}
            className="w-full h-auto rounded"
          />
        </div>
        <div className="w-1/2 space-y-4">
          <h1 className="text-3xl font-bold">Product {id}</h1>
          <p className="text-2xl font-semibold text-gray-700">$99.99</p>
          <p className="text-gray-600">
            This is a detailed description for Product {id}. It showcases the
            features and benefits of our amazing product.
          </p>
          <button className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
            Add to Cart
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-xl font-semibold mb-4">Product Details</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>High-quality materials</li>
          <li>Durable and long-lasting</li>
          <li>Easy to use and maintain</li>
        </ul>
      </div>
    </div>
  );
};

export default ProductDetail;

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { props: {} };
};

import React from 'react';
import Link from 'next/link';

const Products: React.FC = () => {
  return (
    <div className="w-full p-4 space-y-4">
      <h1 className="text-3xl font-bold">Our Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3, 4, 5, 6].map((id) => (
          <Link href={`/products/${id}`} key={id}>
            <div className="border p-4 rounded-lg space-y-2 cursor-pointer">
              <img
                src={`https://via.placeholder.com/400x300?text=Product+${id}`}
                alt={`Product ${id}`}
                className="w-full h-40 object-cover rounded"
              />
              <h2 className="text-xl font-semibold">Product {id}</h2>
              <p className="text-gray-600">$99.99</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;

export const getServerSideProps = async () => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return { props: {} };
};

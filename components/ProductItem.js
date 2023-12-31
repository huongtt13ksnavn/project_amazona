import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const ProductItem = ({ product, addToCart }) => {
  return (
    <div className="card text-center">
      <Link
        className="items-center flex justify-center"
        href={`/product/${product.slug}`}
      >
        <Image
          src={product.image}
          alt={product.name}
          width={298}
          height={298}
          priority={true}
        />
      </Link>
      <Link href={`/product/${product.slug}`}>
        <div className="flex flex-col items-center justify-center p-5">
          <h2 className="text-lg">{product.name}</h2>
        </div>
      </Link>
      <p className="mb-2">{product.brand}</p>
      <p className="mb-2">$ {product.price}</p>
      <button
        className="primary-button mb-2"
        type="button"
        onClick={() => addToCart && addToCart(product)}
      >
        Add to cart
      </button>
    </div>
  );
};

export default ProductItem;

import Layout from '@/components/Layout';
import Product from '@/models/Product';
import { Store } from '@/utils/Store';
import db from '@/utils/db';
import axios from 'axios';
import Image from 'next/image';
import Link from 'next/link';
import React, { useContext } from 'react';
import { toast } from 'react-toastify';

const ProductScreen = ({ product }) => {
  const { state, dispatch } = useContext(Store);
  if (!product) {
    return <Layout title={'Product Not Found'}>Product not found</Layout>;
  }
  const addToCart = async () => {
    const existItem = state.cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;

    const { data } = await axios.get(`/api/product/${product._id}`);

    if (data && quantity > data.countInStock) {
      return toast.error('Sorry. Product is out of stock');
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
    toast.success('Product added to the cart');
  };
  return (
    <Layout title={product.name}>
      <div className="py-2">
        <Link href={'/'}>Back to products</Link>
      </div>
      <div className="grid md:grid-cols-4 md:gap-3">
        <div className="md:col-span-2">
          <Image
            alt={product.name}
            src={product.image}
            width={640}
            height={640}
            priority={true}
          />
        </div>
        <div>
          <ul>
            <li>
              <h1 className="text-lg">{product.name}</h1>
            </li>
            <li>Category: {product.category}</li>
            <li>Brand: {product.brand}</li>
            <li>
              {product.rating} of {product.numReviews} reviews
            </li>
            <li>{product.description}</li>
          </ul>
        </div>
        <div>
          <div className="card p-5">
            <div className="mb-2 flex justify-between">
              <div>Price</div>
              <div>{`${product.price} $`}</div>
            </div>
            <div className="mb-2 flex justify-between">
              <div>Status</div>
              <div>{product.countInStock > 0 ? 'In stock' : 'Unavailable'}</div>
            </div>
            <button className="primary-button w-full" onClick={addToCart}>
              Add to cart
            </button>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export async function getServerSideProps(context) {
  const { params } = context;
  const { slug } = params;
  await db.connect();
  const product = await Product.findOne({ slug }).lean();
  await db.disconnect();
  return {
    props: {
      product: product ? db.convertDocToObj(product) : null,
    },
  };
}

export default ProductScreen;

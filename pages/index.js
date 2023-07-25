import Layout from '@/components/Layout';
import ProductItem from '@/components/ProductItem';
import { Store } from '@/utils/Store';
import data from '@/utils/data';
import { useContext } from 'react';

export default function Home() {
  const { state, dispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;
  const addToCart = (product) => {
    const existItem = cartItems.find((x) => x.slug === product.slug);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    if (existItem && !(existItem.countInStock > 0)) {
      alert('Sorry. Product is out of stock');
      return;
    }
    dispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity: quantity },
    });
  };
  return (
    <Layout title={'Home Page'}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {data.products.map((product) => (
          <ProductItem
            key={product.slug}
            product={product}
            addToCart={addToCart}
          />
        ))}
      </div>
    </Layout>
  );
}

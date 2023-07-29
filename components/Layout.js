import { Store } from '@/utils/Store';
import Head from 'next/head';
import Link from 'next/link';
import React, { useContext, useEffect, useState } from 'react';

const Layout = ({ children, title }) => {
  const { state } = useContext(Store);
  const [countCartItems, setCountCartItems] = useState(0);
  useEffect(() => {
    setCountCartItems(state.cart.cartItems.reduce((a, c) => a + c.quantity, 0));
  }, [state.cart.cartItems]);

  return (
    <>
      <Head>
        <title>{title ? title + ' - Amazona' : 'Amazona'}</title>
        <meta name="description" content="Amazona" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div className="flex flex-column min-h-screen flex-col justify-between">
        <header>
          <nav className="flex h-12 justify-between shadow-md items-center px-4">
            <Link href={'/'} className="text-lg font-bold">
              Amazona
            </Link>
            <div>
              <Link href={'/cart'} className="p-2">
                Cart
                {countCartItems > 0 && (
                  <span className="ml-1 rounded-full bg-red-600 px-2 py-1 text-xs font-bold text-white">
                    {countCartItems}
                  </span>
                )}
              </Link>
              <Link href={'/'} className="p-2">
                Login
              </Link>
            </div>
          </nav>
        </header>
        <main className="container m-auto mt-4 px-4">{children}</main>
        <footer className="flex h-10 justify-center items-center shadow-inner">
          Copyright © Amazona 2023
        </footer>
      </div>
    </>
  );
};

export default Layout;

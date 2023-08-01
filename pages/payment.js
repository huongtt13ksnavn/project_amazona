import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const PaymentScreen = () => {
  const router = useRouter();
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState(null);
  const { dispatch, state } = useContext(Store);
  const { cart } = state;
  const { shippingAddress, paymentMethod } = cart;
  const submitHandler = (e) => {
    e.preventDefault();
    if (!selectedPaymentMethod) {
      return toast.error('Payment method is required');
    }
    dispatch({ type: 'SAVE_PAYMENT_METHOD', payload: selectedPaymentMethod });
    router.push('/placeorder');
  };

  useEffect(() => {
    if (!shippingAddress.address) {
      router.push('/shipping');
    } else {
      setSelectedPaymentMethod(paymentMethod);
    }
  }, [shippingAddress.address, paymentMethod, router]);

  return (
    <Layout title="Payment method">
      <CheckoutWizard activeStep={2} />
      <form
        className="mx-auto max-w-screen-md"
        action="post"
        onSubmit={submitHandler}
      >
        <h1 className="text-xl">Payment method</h1>
        {['Paypal', 'Stripe', 'CashOnDelivery'].map((payment) => (
          <div key={payment} className="mb-4">
            <input
              type="radio"
              name="paymentMethod"
              id={payment}
              className="p-2 outline-none focus:ring-0"
              checked={selectedPaymentMethod === payment}
              onChange={() => setSelectedPaymentMethod(payment)}
            />
            <label htmlFor={payment} className="p-2">
              {payment}
            </label>
          </div>
        ))}

        <div className="flex justify-between mb-4">
          <button
            className="default-button"
            type="button"
            onClick={() => router.push('/shipping')}
          >
            Back
          </button>
          <button className="primary-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

export default PaymentScreen;

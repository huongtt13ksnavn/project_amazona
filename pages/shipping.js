import CheckoutWizard from '@/components/CheckoutWizard';
import Layout from '@/components/Layout';
import { Store } from '@/utils/Store';
import { useRouter } from 'next/router';
import React, { useContext, useEffect } from 'react';
import { useForm } from 'react-hook-form';

const ShippingScreen = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
    setValue,
  } = useForm();

  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const { shippingAddress } = cart;
  const router = useRouter();

  const submitHandler = ({ fullname, address, city, postalcode, country }) => {
    dispatch({
      type: 'SAVE_SHIPPING_ADDRESS',
      payload: { fullname, address, city, postalcode, country },
    });

    router.push('/payment');
  };

  useEffect(() => {
    setValue('fullname', shippingAddress?.fullname);
    setValue('address', shippingAddress?.address);
    setValue('city', shippingAddress?.city);
    setValue('postalcode', shippingAddress?.postalcode);
    setValue('country', shippingAddress?.country);
  }, [setValue, shippingAddress]);

  return (
    <Layout title={'Shipping Address'}>
      <CheckoutWizard activeStep={1} />
      <form
        className="mx-auto max-w-screen-md"
        method="post"
        onSubmit={handleSubmit(submitHandler)}
      >
        <h1 className="mb-4 text-xl">Shipping Address</h1>
        <div className="mb-4">
          <label htmlFor="fullname">Fullname</label>
          <input
            id="fullname"
            className="w-full"
            name="fullname"
            type="text"
            autoFocus
            {...register('fullname', {
              required: 'Fullname is required',
            })}
          />
          {errors.fullname && (
            <span className="text-red-500">{errors.fullname.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="address">Address</label>
          <input
            id="address"
            className="w-full"
            name="address"
            type="text"
            autoFocus
            {...register('address', {
              required: 'Address is required',
            })}
          />
          {errors.address && (
            <span className="text-red-500">{errors.address.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="city">City</label>
          <input
            id="city"
            className="w-full"
            name="city"
            type="text"
            autoFocus
            {...register('city', {
              required: 'City is required',
            })}
          />
          {errors.city && (
            <span className="text-red-500">{errors.city.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="postalcode">Postal Code</label>
          <input
            id="postalcode"
            className="w-full"
            name="postalcode"
            type="text"
            autoFocus
            {...register('postalcode', {
              required: 'Postal Code is required',
            })}
          />
          {errors.postalcode && (
            <span className="text-red-500">{errors.postalcode.message}</span>
          )}
        </div>

        <div className="mb-4">
          <label htmlFor="country">Country</label>
          <input
            id="country"
            className="w-full"
            name="country"
            type="text"
            autoFocus
            {...register('country', {
              required: 'Country is required',
            })}
          />
          {errors.country && (
            <span className="text-red-500">{errors.country.message}</span>
          )}
        </div>

        <div className="mb-4 flex justify-center">
          <button className="primary-button" type="submit">
            Next
          </button>
        </div>
      </form>
    </Layout>
  );
};

ShippingScreen.auth = true;

export default ShippingScreen;

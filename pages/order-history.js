import Layout from '@/components/Layout';
import { getError } from '@/utils/error';
import axios from 'axios';
import Link from 'next/link';
import { useEffect, useReducer } from 'react';

function reducer(state, action) {
  switch (action.type) {
    case 'FETCH_REQUEST':
      return { ...state, loading: true, error: '' };
    case 'FETCH_SUCCESS':
      return { ...state, loading: false, orders: action.payload, error: '' };
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default:
      state;
  }
}

const OrderHistoryScreen = () => {
  const [{ loading, orders, error }, dispatch] = useReducer(reducer, {
    loading: false,
    orders: [],
    error: '',
  });

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        dispatch({ type: 'FETCH_REQUEST' });
        const { data } = await axios.get(`/api/orders/history`);
        dispatch({ type: 'FETCH_SUCCESS', payload: data });
      } catch (error) {
        dispatch({ type: 'FETCH_FAILED', payload: getError(error) });
      }
    };
    fetchOrders();
  }, []);

  return (
    <Layout title="Order History">
      <h1 className="mb-4 text-xl">Order History</h1>
      {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div className="alert-error">{getError(error)}</div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b">
              <tr>
                <th className="px-5 text-right">ID</th>
                <th className="p-5 text-right">DATE</th>
                <th className="p-5 text-right">TOTAL</th>
                <th className="p-5 text-right">PAID</th>
                <th className="p-5 text-right">DELIVERED</th>
                <th className="p-5 text-right">ACTIONS</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((item) => (
                <tr className="border-b" key={item._id}>
                  <td className="p-5 text-right">
                    {item._id.substring(20, 24)}
                  </td>
                  <td className="p-5 text-right">$ {item.createdAt}</td>
                  <td className="p-5 text-right">$ {item.totalPrice}</td>
                  <td className="p-5 text-right">
                    {item.isPaid ? 'Paid' : 'Unpaid'}
                  </td>
                  <td className="p-5 text-right">
                    {item.isDelivered ? 'Delivered' : 'Undelivered'}
                  </td>
                  <td className="p-5 text-right">
                    <Link href={`/order/${item._id}`}>Details</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </Layout>
  );
};
OrderHistoryScreen.auth = true;
export default OrderHistoryScreen;

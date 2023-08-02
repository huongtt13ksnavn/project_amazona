import Order from '@/models/Order';
import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';

export default async function handler(req, res) {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const orders = await Order.find({ user: user._id }).lean();
  await db.disconnect();
  res.status(200).json(orders);
}

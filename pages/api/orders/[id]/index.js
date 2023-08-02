import Order from '@/models/Order';
import db from '@/utils/db';
import { getToken } from 'next-auth/jwt';

const handler = async (req, res) => {
  const user = await getToken({ req });
  if (!user) {
    return res.status(401).send('signin required');
  }

  await db.connect();
  const order = await Order.findById(req.query.id).lean();
  await db.disconnect();
  res.status(200).json(order);
};
export default handler;

import Product from '@/models/Product';
import db from '@/utils/db';

export default async function handler(req, res) {
  await db.connect();
  const product = await Product.findOne({ _id: req.query.id }).lean();
  await db.disconnect();
  res.status(200).json(product);
}

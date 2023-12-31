import bcrypt from 'bcryptjs';

const data = {
  users: [
    {
      name: 'huongtt',
      email: 'huongtt@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: true,
    },
    {
      name: 'laura',
      email: 'laura@example.com',
      password: bcrypt.hashSync('123456'),
      isAdmin: false,
    },
  ],
  products: [
    {
      name: 'Free shirt',
      slug: 'free shirt',
      category: 'shirts',
      image: '/images/shirt1.jpg',
      price: 100,
      brand: 'Nike',
      rating: 4.5,
      numReviews: 8,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Slim shirt',
      slug: 'slim shirt',
      category: 'shirts',
      image: '/images/shirt3.jpg',
      price: 150,
      brand: 'Raymond',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular shirt',
    },
    {
      name: 'Golf Pants',
      slug: 'golf pants',
      category: 'pants',
      image: '/images/pants3.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular pants',
    },
    {
      name: 'Slim Pants',
      slug: 'slim pants',
      category: 'pants',
      image: '/images/pants2.jpg',
      price: 90,
      brand: 'Oliver',
      rating: 4.5,
      numReviews: 3,
      countInStock: 20,
      description: 'A popular pants',
    },
  ],
};

export default data;

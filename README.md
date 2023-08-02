# Build Nextjs ECommerce Website Like Amazon

- Tech: Nextjs, Next Auth
- UI: Tailwind, chart.js, react-chartjs
- DB: MongoDB, Mongoose
- Payment: PayPal, Stripe
- Content Hosting: cloudinary
- Deploy: Github, Vercel, MongoDB Atlas

![next amazona](/public/app.jpg)

## Run Locally

1. Clone repo

   ```shell
    $ git clone https://github.com/huongtt13ksnavn/project_amazona.git
    $ cd project_amazona
   ```

2. Create .env File

   - duplicate .env.example and rename it to .env

3. Setup MongoDB

   - Local MongoDB
   - Install it from [here](https://www.mongodb.com/try/download/community)
   - In .env file update MONGODB_URI=mongodb://localhost/amazona
   - OR Atlas Cloud MongoDB
   - Create database at [https://cloud.mongodb.com](https://cloud.mongodb.com)
   - In .env file update MONGODB_URI=mongodb+srv://your-db-connection

4. Install and Run

   ```shell
     npm install
     npm run dev
   ```

5. Seed Data

   - Run this on browser: http://localhost:3000/api/seed
   - It returns admin email and password and sample products

6. Admin Login

   - Run http://localhost:3000/login
   - Enter admin email and password and click Login

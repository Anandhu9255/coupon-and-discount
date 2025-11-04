# Coupon and Discount Backend

This is a Node.js/Express backend for a coupon and discount system built with TypeScript and MongoDB.

## Deployment on Render

### Prerequisites
- A Render account
- MongoDB Atlas cluster set up

### Steps to Deploy

1. **Connect your GitHub repository to Render:**
   - Go to Render Dashboard
   - Click "New" > "Web Service"
   - Connect your GitHub repo: `https://github.com/Anandhu9255/coupon-and-discount.git`

2. **Configure the service:**
   - **Name:** coupon-discount-backend
   - **Runtime:** Node
   - **Build Command:** `npm run build`
   - **Start Command:** `npm start`

3. **Set Environment Variables in Render Dashboard:**
   - `MONGO_URI` = `mongodb+srv://anandhuanilkumar450507_db_user:<your_actual_db_password>@cluster0.3irvmon.mongodb.net/`
   - `PORT` = `10000`

4. **Deploy:**
   - Click "Create Web Service"
   - Render will build and deploy your app

### Important Notes
- Replace `<your_actual_db_password>` with your actual MongoDB Atlas password in the MONGO_URI.
- The app uses TypeScript, so the build step compiles it to JavaScript in the `dist` folder.
- CORS is enabled for all origins to allow frontend connections.

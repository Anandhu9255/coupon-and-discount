import express from 'express';
import cors from 'cors';
import productRoutes from './routes/productRoutes';
import cartRoutes from './routes/cartRoutes';
import couponRoutes from './routes/couponRoutes';
import authRoutes from './routes/authRoutes';
import errorHandler from './middleware/errorHandler';

const app = express();

// Middleware
app.use(cors({
  origin: true, // Allow all origins
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/coupons', couponRoutes);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'Server is running' });
});

// Error handling middleware
app.use(errorHandler);

export default app;

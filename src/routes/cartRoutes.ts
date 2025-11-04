import { Router } from 'express';
import { addToCart, getCart, applyCoupon } from '../controllers/cartController';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const addToCartSchema = z.object({
  productId: z.string(),
  quantity: z.number().min(1)
});

const applyCouponSchema = z.object({
  couponCode: z.string()
});

router.post('/add', authenticate, validateRequest(addToCartSchema), addToCart);
router.get('/', authenticate, getCart);
router.post('/apply-coupon', authenticate, validateRequest(applyCouponSchema), applyCoupon);

export default router;

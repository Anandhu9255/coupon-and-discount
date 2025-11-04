import { Router } from 'express';
import { createCoupon, getCouponByCode } from '../controllers/couponController';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate, requireAdmin } from '../middleware/auth';
import { z } from 'zod';

const router = Router();

const createCouponSchema = z.object({
  code: z.string(),
  discountType: z.enum(['percentage', 'fixed']),
  discountValue: z.number().min(0),
  minPurchase: z.number().min(0).optional(),
  maxDiscount: z.number().min(0).optional(),
  expiryDate: z.string().transform(str => new Date(str)),
  isActive: z.boolean().optional()
});

router.post('/', authenticate, requireAdmin, validateRequest(createCouponSchema), createCoupon);
router.get('/:code', authenticate, getCouponByCode);

export default router;

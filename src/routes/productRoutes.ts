import { Router } from 'express';
import { getProducts, getProductById, createProduct } from '../controllers/productController';
import { validateRequest } from '../middleware/validateRequest';
import { authenticate, requireAdmin } from '../middleware/auth';
import { createProductSchema } from '../schemas';

const router = Router();

router.post('/', authenticate, requireAdmin, validateRequest(createProductSchema), createProduct);
router.get('/', getProducts);
router.get('/:id', getProductById);

export default router;

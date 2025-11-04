"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartController_1 = require("../controllers/cartController");
const validateRequest_1 = require("../middleware/validateRequest");
const auth_1 = require("../middleware/auth");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const addToCartSchema = zod_1.z.object({
    productId: zod_1.z.string(),
    quantity: zod_1.z.number().min(1)
});
const applyCouponSchema = zod_1.z.object({
    couponCode: zod_1.z.string()
});
router.post('/add', auth_1.authenticate, (0, validateRequest_1.validateRequest)(addToCartSchema), cartController_1.addToCart);
router.get('/', auth_1.authenticate, cartController_1.getCart);
router.post('/apply-coupon', auth_1.authenticate, (0, validateRequest_1.validateRequest)(applyCouponSchema), cartController_1.applyCoupon);
exports.default = router;
//# sourceMappingURL=cartRoutes.js.map
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const couponController_1 = require("../controllers/couponController");
const validateRequest_1 = require("../middleware/validateRequest");
const auth_1 = require("../middleware/auth");
const zod_1 = require("zod");
const router = (0, express_1.Router)();
const createCouponSchema = zod_1.z.object({
    code: zod_1.z.string(),
    discountType: zod_1.z.enum(['percentage', 'fixed']),
    discountValue: zod_1.z.number().min(0),
    minPurchase: zod_1.z.number().min(0).optional(),
    maxDiscount: zod_1.z.number().min(0).optional(),
    expiryDate: zod_1.z.string().transform(str => new Date(str)),
    isActive: zod_1.z.boolean().optional()
});
router.post('/', auth_1.authenticate, auth_1.requireAdmin, (0, validateRequest_1.validateRequest)(createCouponSchema), couponController_1.createCoupon);
router.get('/:code', auth_1.authenticate, couponController_1.getCouponByCode);
exports.default = router;
//# sourceMappingURL=couponRoutes.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCouponByCode = exports.createCoupon = void 0;
const Coupon_1 = __importDefault(require("../models/Coupon"));
const createCoupon = async (req, res, next) => {
    try {
        const existingCoupon = await Coupon_1.default.findOne({ code: req.body.code.toUpperCase() });
        if (existingCoupon) {
            res.status(400).json({ success: false, message: 'Coupon code already exists' });
            return;
        }
        const coupon = new Coupon_1.default(req.body);
        await coupon.save();
        res.status(201).json({ success: true, message: 'Coupon created successfully', data: coupon });
    }
    catch (error) {
        next(error);
    }
};
exports.createCoupon = createCoupon;
const getCouponByCode = async (req, res, next) => {
    try {
        const coupon = await Coupon_1.default.findOne({ code: req.params.code.toUpperCase() });
        if (!coupon) {
            res.status(404).json({ success: false, message: 'Coupon not found' });
            return;
        }
        res.json({ success: true, data: coupon });
    }
    catch (error) {
        next(error);
    }
};
exports.getCouponByCode = getCouponByCode;
//# sourceMappingURL=couponController.js.map
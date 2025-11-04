import { Response, NextFunction } from 'express';
import Coupon from '../models/Coupon';
import { AuthRequest } from '../types';

export const createCoupon = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const existingCoupon = await Coupon.findOne({ code: req.body.code.toUpperCase() });
    if (existingCoupon) {
      res.status(400).json({ success: false, message: 'Coupon code already exists' });
      return;
    }
    const couponData = { ...req.body };
    if (couponData.discountType === 'flat') {
      couponData.discountType = 'fixed';
    }
    const coupon = new Coupon(couponData);
    await coupon.save();
    res.status(201).json({ success: true, message: 'Coupon created successfully', data: coupon });
  } catch (error) {
    next(error);
  }
};

export const getCouponByCode = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const coupon = await Coupon.findOne({ code: req.params.code.toUpperCase() });
    if (!coupon) {
      res.status(404).json({ success: false, message: 'Coupon not found' });
      return;
    }
    res.json({ success: true, data: coupon });
  } catch (error) {
    next(error);
  }
};

import { Response, NextFunction } from 'express';
import Cart from '../models/Cart';
import Coupon from '../models/Coupon';
import Product from '../models/Product';
import { calculateDiscount, calculateTotal } from '../utils/calculateDiscount';
import { ICartItem, AuthRequest } from '../types';

export const addToCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user!.id;

    const product = await Product.findById(productId);
    if (!product) {
      res.status(404).json({ success: false, message: 'Product not found' });
      return;
    }

    let cart = await Cart.findOne({ userId });
    if (!cart) {
      cart = new Cart({ userId, items: [], total: 0 });
    }

    const existingItem = cart.items.find(item => item.product.toString() === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ product: productId, quantity });
    }

    const populatedCart = await cart.populate('items.product');
    const discount = cart.coupon ? calculateDiscount(cart.total, cart.coupon, populatedCart.items as ICartItem[]) : 0;
    cart.total = calculateTotal(populatedCart.items as ICartItem[], discount);

    await cart.save();
    await cart.populate('items.product coupon');

    res.json({ success: true, message: 'Product added to cart successfully', data: cart });
  } catch (error) {
    next(error);
  }
};

export const getCart = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const userId = req.user!.id;
    const cart = await Cart.findOne({ userId }).populate('items.product coupon');

    if (!cart) {
      res.json({ success: true, data: { items: [], total: 0 } });
      return;
    }

    res.json({ success: true, data: cart });
  } catch (error) {
    next(error);
  }
};

export const applyCoupon = async (req: AuthRequest, res: Response, next: NextFunction): Promise<void> => {
  try {
    const { couponCode } = req.body;
    const userId = req.user!.id;

    const cart = await Cart.findOne({ userId }).populate('items.product');
    if (!cart) {
      res.status(404).json({ success: false, message: 'Cart not found' });
      return;
    }

    const coupon = await Coupon.findOne({ code: couponCode.toUpperCase() });
    if (!coupon) {
      res.status(404).json({ success: false, message: 'Invalid coupon code' });
      return;
    }

    // Calculate subtotal from items
    const subtotal = cart.items.reduce((sum, item) => sum + ((item.product as any).price * item.quantity), 0);

    // Validate coupon
    if (!coupon.isActive) {
      res.status(400).json({ success: false, message: 'Coupon is not active' });
      return;
    }

    if (Date.now() > coupon.expiryDate.getTime()) {
      res.status(400).json({ success: false, message: 'Coupon has expired' });
      return;
    }

    if (coupon.minPurchase && subtotal < coupon.minPurchase) {
      res.status(400).json({ success: false, message: `Minimum purchase of $${coupon.minPurchase} required` });
      return;
    }

    // Calculate discount
    let discount = 0;
    if (coupon.discountType === 'percentage') {
      discount = (subtotal * coupon.discountValue) / 100;
    } else if (coupon.discountType === 'fixed' || coupon.discountType === 'flat') {
      discount = coupon.discountValue;
    }

    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
      discount = coupon.maxDiscount;
    }

    // Update cart
    const totalAfterDiscount = Math.max(subtotal - discount, 0);
    cart.total = totalAfterDiscount;
    cart.coupon = coupon._id;

    await cart.save();
    await cart.populate('coupon');

    res.json({
      success: true,
      message: 'Coupon applied successfully',
      discount,
      data: {
        totalBeforeDiscount: subtotal,
        totalAfterDiscount: totalAfterDiscount,
        coupon,
        items: cart.items
      }
    });
  } catch (error) {
    next(error);
  }
};

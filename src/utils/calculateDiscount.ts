import { ICoupon, ICartItem } from '../types';

export const calculateDiscount = (total: number, coupon: ICoupon, items: ICartItem[]): number => {
  if (!coupon.isActive || Date.now() > coupon.expiryDate.getTime()) {
    return 0;
  }

  if (coupon.minPurchase && total < coupon.minPurchase) {
    return 0;
  }

  let discount = 0;

  if (coupon.discountType === 'percentage') {
    discount = (total * coupon.discountValue) / 100;
  } else if (coupon.discountType === 'fixed' || coupon.discountType === 'flat') {
    discount = coupon.discountValue;
  }

  if (coupon.maxDiscount && discount > coupon.maxDiscount) {
    discount = coupon.maxDiscount;
  }

  return discount;
};

export const calculateTotal = (items: ICartItem[], discount: number = 0): number => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  return Math.max(subtotal - discount, 0);
};

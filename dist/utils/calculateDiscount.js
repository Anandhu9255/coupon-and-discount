"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateTotal = exports.calculateDiscount = void 0;
const calculateDiscount = (total, coupon, items) => {
    if (!coupon.isActive || Date.now() > coupon.expiryDate.getTime()) {
        return 0;
    }
    if (coupon.minPurchase && total < coupon.minPurchase) {
        return 0;
    }
    let discount = 0;
    if (coupon.discountType === 'percentage') {
        discount = (total * coupon.discountValue) / 100;
    }
    else if (coupon.discountType === 'fixed') {
        discount = coupon.discountValue;
    }
    if (coupon.maxDiscount && discount > coupon.maxDiscount) {
        discount = coupon.maxDiscount;
    }
    return discount;
};
exports.calculateDiscount = calculateDiscount;
const calculateTotal = (items, discount = 0) => {
    const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
    return Math.max(subtotal - discount, 0);
};
exports.calculateTotal = calculateTotal;
//# sourceMappingURL=calculateDiscount.js.map
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.applyCoupon = exports.getCart = exports.addToCart = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const Coupon_1 = __importDefault(require("../models/Coupon"));
const Product_1 = __importDefault(require("../models/Product"));
const calculateDiscount_1 = require("../utils/calculateDiscount");
const addToCart = async (req, res, next) => {
    try {
        const { productId, quantity } = req.body;
        const userId = req.user.id;
        const product = await Product_1.default.findById(productId);
        if (!product) {
            res.status(404).json({ success: false, message: 'Product not found' });
            return;
        }
        let cart = await Cart_1.default.findOne({ userId });
        if (!cart) {
            cart = new Cart_1.default({ userId, items: [], total: 0 });
        }
        const existingItem = cart.items.find(item => item.product.toString() === productId);
        if (existingItem) {
            existingItem.quantity += quantity;
        }
        else {
            cart.items.push({ product: productId, quantity });
        }
        const populatedCart = await cart.populate('items.product');
        const discount = cart.coupon ? (0, calculateDiscount_1.calculateDiscount)(cart.total, cart.coupon, populatedCart.items) : 0;
        cart.total = (0, calculateDiscount_1.calculateTotal)(populatedCart.items, discount);
        await cart.save();
        await cart.populate('items.product coupon');
        res.json({ success: true, message: 'Product added to cart successfully', data: cart });
    }
    catch (error) {
        next(error);
    }
};
exports.addToCart = addToCart;
const getCart = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const cart = await Cart_1.default.findOne({ userId }).populate('items.product coupon');
        if (!cart) {
            res.json({ success: true, data: { items: [], total: 0 } });
            return;
        }
        res.json({ success: true, data: cart });
    }
    catch (error) {
        next(error);
    }
};
exports.getCart = getCart;
const applyCoupon = async (req, res, next) => {
    try {
        const { couponCode } = req.body;
        const userId = req.user.id;
        const cart = await Cart_1.default.findOne({ userId }).populate('items.product');
        if (!cart) {
            res.status(404).json({ success: false, message: 'Cart not found' });
            return;
        }
        const coupon = await Coupon_1.default.findOne({ code: couponCode.toUpperCase() });
        if (!coupon) {
            res.status(404).json({ success: false, message: 'Invalid coupon code' });
            return;
        }
        // Calculate subtotal from items
        const subtotal = cart.items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
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
        }
        else if (coupon.discountType === 'fixed') {
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
    }
    catch (error) {
        next(error);
    }
};
exports.applyCoupon = applyCoupon;
//# sourceMappingURL=cartController.js.map
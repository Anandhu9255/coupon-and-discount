import { Request } from 'express';

export interface IProduct {
  _id?: string;
  name: string;
  price: number;
  description: string;
  category: string;
  stock: number;
}

export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface ICart {
  _id?: string;
  userId: string;
  items: ICartItem[];
  total: number;
  coupon?: ICoupon;
}

export interface ICoupon {
  _id?: string;
  code: string;
  discountType: 'percentage' | 'fixed' | 'flat';
  discountValue: number;
  minPurchase?: number;
  maxDiscount?: number;
  expiryDate: Date;
  isActive: boolean;
}

export interface IUser {
  _id?: string;
  email: string;
  password: string;
  role: 'user' | 'admin';
}

export interface AuthRequest extends Request {
  user?: {
    id: string;
    email: string;
    role: 'user' | 'admin';
  };
}

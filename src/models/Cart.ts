import mongoose, { Schema, Document } from 'mongoose';
import { ICart } from '../types';

const CartItemSchema: Schema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: 'Product', required: true },
  quantity: { type: Number, required: true, min: 1 }
}, { _id: false });

const CartSchema: Schema = new Schema({
  userId: { type: String, required: true },
  items: [CartItemSchema],
  total: { type: Number, required: true, default: 0 },
  coupon: { type: Schema.Types.ObjectId, ref: 'Coupon' }
}, {
  timestamps: true
});

export default mongoose.model<ICart & Document>('Cart', CartSchema);

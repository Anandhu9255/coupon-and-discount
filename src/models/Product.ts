import mongoose, { Schema, Document } from 'mongoose';
import { IProduct } from '../types';

const ProductSchema: Schema = new Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  description: { type: String, required: true },
  category: { type: String, required: true },
  stock: { type: Number, required: true, min: 0 }
}, {
  timestamps: true
});

export default mongoose.model<IProduct & Document>('Product', ProductSchema);

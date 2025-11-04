import mongoose, { Schema, Document } from 'mongoose';
import { IUser } from '../types';

const UserSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['user', 'admin'], default: 'user' }
}, {
  timestamps: true
});

export default mongoose.model<IUser & Document>('User', UserSchema);

const mongoose = require('mongoose');

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/coupon-discount', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});

// Define Coupon schema (same as in your model)
const couponSchema = new mongoose.Schema({
  code: { type: String, required: true, unique: true, uppercase: true },
  discountType: { type: String, enum: ['percentage', 'fixed'], required: true },
  discountValue: { type: Number, required: true, min: 0 },
  minPurchase: { type: Number, min: 0 },
  maxDiscount: { type: Number, min: 0 },
  expiryDate: { type: Date, required: true },
  isActive: { type: Boolean, default: true }
}, {
  timestamps: true
});

const Coupon = mongoose.model('Coupon', couponSchema);

// Update the coupon expiry date to a future date
async function updateCoupon() {
  try {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1); // Set to 1 year from now

    const result = await Coupon.findOneAndUpdate(
      { code: 'SAVE10' },
      { expiryDate: futureDate },
      { new: true }
    );

    if (result) {
      console.log('Coupon updated successfully:', result);
    } else {
      console.log('Coupon not found');
    }
  } catch (error) {
    console.error('Error updating coupon:', error);
  } finally {
    mongoose.connection.close();
  }
}

updateCoupon();

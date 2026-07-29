import mongoose from 'mongoose';

const bookingSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    service: { type: String, required: true },
    slotDate: { type: String, required: true },
    slotTime: { type: String, required: true },
    paymentType: { type: String, enum: ['prepaid', 'cod'], required: true },
    status: { type: String, default: 'confirmed' },
    notes: { type: String, default: '' }
  },
  { timestamps: true }
);

bookingSchema.index({ slotDate: 1, slotTime: 1 }, { unique: true });

export default mongoose.model('Booking', bookingSchema);

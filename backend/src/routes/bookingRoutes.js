import express from 'express';
import mongoose from 'mongoose';
import { protect } from '../middleware/auth.js';
import Booking from '../models/Booking.js';
import { createBooking, findBookingBySlot, getAvailableSlots, listBookingsForUser } from '../storage.js';

const router = express.Router();

const getNextThreeDays = () => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < 3; i += 1) {
    const date = new Date(today);
    date.setDate(today.getDate() + i);
    dates.push(date.toISOString().split('T')[0]);
  }
  return dates;
};

const slots = ['09:00', '11:00', '14:00', '16:00'];
const useMongo = () => false;

router.get('/available', async (_req, res) => {
  try {
    const dates = getNextThreeDays();
    if (useMongo()) {
      const bookings = await Booking.find({ slotDate: { $in: dates } }).select('slotDate slotTime');
      const occupied = new Set(bookings.map((b) => `${b.slotDate}:${b.slotTime}`));

      const available = dates.flatMap((date) =>
        slots
          .filter((time) => !occupied.has(`${date}:${time}`))
          .map((time) => ({ date, time }))
      );

      return res.json({ available });
    }

    const available = await getAvailableSlots(dates, slots);
    return res.json({ available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.post('/', protect, async (req, res) => {
  try {
    const rawBody = req.body && typeof req.body === 'object' ? req.body : {};
    const { service, slotDate, slotTime, paymentType, notes } = rawBody;
    const existing = await findBookingBySlot(slotDate, slotTime);
    if (existing) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    const booking = await createBooking({ user: req.user._id, service, slotDate, slotTime, paymentType, notes });
    if (booking.conflict) {
      return res.status(409).json({ message: 'Slot already booked' });
    }

    return res.status(201).json({ booking });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
});

router.get('/mine', protect, async (req, res) => {
  try {
    if (useMongo()) {
      const bookings = await Booking.find({ user: req.user._id }).sort({ createdAt: -1 });
      return res.json({ bookings });
    }
    const bookings = await listBookingsForUser(req.user._id);
    return res.json({ bookings });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;

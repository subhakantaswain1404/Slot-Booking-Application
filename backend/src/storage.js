import mongoose from 'mongoose';

const users = [];
const bookings = [];

const makeId = () => `${Date.now()}-${Math.random().toString(16).slice(2)}`;

export const isMongoConnected = () => mongoose.connection.readyState === 1;

export const createUser = async (data) => {
  const user = {
    _id: makeId(),
    ...data,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  users.push(user);
  return user;
};

export const findUserByEmail = async (email) => users.find((user) => user.email === email) || null;
export const findUserById = async (id) => users.find((user) => user._id === id) || null;

export const createBooking = async (data) => {
  const exists = bookings.some((booking) => booking.slotDate === data.slotDate && booking.slotTime === data.slotTime);
  if (exists) {
    return { conflict: true };
  }

  const booking = {
    _id: makeId(),
    ...data,
    status: 'confirmed',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };
  bookings.push(booking);
  return booking;
};

export const findBookingBySlot = async (slotDate, slotTime) =>
  bookings.find((booking) => booking.slotDate === slotDate && booking.slotTime === slotTime) || null;

export const listBookingsForUser = async (userId) =>
  bookings.filter((booking) => booking.user === userId).sort((a, b) => b.createdAt.localeCompare(a.createdAt));

export const getAvailableSlots = async (dates, slotTimes) => {
  const occupied = new Set(
    bookings.filter((booking) => dates.includes(booking.slotDate)).map((booking) => `${booking.slotDate}:${booking.slotTime}`)
  );

  return dates.flatMap((date) =>
    slotTimes.filter((time) => !occupied.has(`${date}:${time}`)).map((time) => ({ date, time }))
  );
};

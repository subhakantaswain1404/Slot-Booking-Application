import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import authRoutes from './routes/authRoutes.js';
import bookingRoutes from './routes/bookingRoutes.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ strict: false, type: ['application/json', 'application/*+json'] }));
app.use(express.urlencoded({ extended: true, type: 'application/x-www-form-urlencoded' }));

app.get('/health', (_req, res) => res.json({ ok: true }));
app.use('/api/auth', authRoutes);
app.use('/api/bookings', bookingRoutes);

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/kineticage';
    await mongoose.connect(mongoUri, { serverSelectionTimeoutMS: 1000 });
    console.log('MongoDB connected');
  } catch (err) {
    console.log('MongoDB unavailable, using in-memory fallback storage');
  }

  app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
};

startServer();

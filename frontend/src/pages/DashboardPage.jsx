import { useEffect, useState } from 'react';
import axios from 'axios';

const DashboardPage = ({ user, token }) => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:5000/api'}/bookings/mine`, { headers: { Authorization: `Bearer ${token}` } }).then((res) => setBookings(res.data.bookings));
  }, [token]);

  return (
    <div className="panel">
      <h2>{user?.name}'s Dashboard</h2>
      <p>Review your upcoming and past bookings.</p>
      {bookings.length === 0 ? (
        <p>No bookings yet.</p>
      ) : (
        <ul className="booking-list">
          {bookings.map((booking) => (
            <li key={booking._id}>
              <strong>{booking.service}</strong> · {booking.slotDate} at {booking.slotTime} · {booking.paymentType.toUpperCase()} · {booking.status}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DashboardPage;

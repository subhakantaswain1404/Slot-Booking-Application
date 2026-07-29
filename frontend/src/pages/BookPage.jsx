import { useEffect, useState } from 'react';
import axios from 'axios';

const API = 'http://localhost:5000/api';

const services = [
  'Senior Wellness Assessment',
  'Mobility Coaching Session',
  'Balance & Stability Program',
  'Strength Recovery Plan'
];

const BookPage = ({ user, token, setNotification }) => {
  const [available, setAvailable] = useState([]);
  const [selected, setSelected] = useState('');
  const [form, setForm] = useState({ service: services[0], slotDate: '', slotTime: '', paymentType: 'prepaid', notes: '' });
  const [message, setMessage] = useState('');

  useEffect(() => {
    axios.get(`${API}/bookings/available`).then((res) => setAvailable(res.data.available));
  }, []);

  const submitBooking = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        service: form.service,
        slotDate: form.slotDate,
        slotTime: form.slotTime,
        paymentType: form.paymentType,
        notes: form.notes
      };
      const res = await axios.post(`${API}/bookings`, payload, { headers: { Authorization: `Bearer ${token}` } });
      const successMessage = `Booking confirmed for ${res.data.booking.service} on ${res.data.booking.slotDate} at ${res.data.booking.slotTime}`;
      setMessage(successMessage);
      setNotification(successMessage);
    } catch (err) {
      const errorMessage = err.response?.data?.message || 'Unable to book';
      setMessage(errorMessage);
      setNotification(errorMessage);
    }
  };

  return (
    <div className="content-grid">
      <section className="panel">
        <h2>Welcome, {user?.name}</h2>
        <p>KineticAge offers senior wellness and mobility services with flexible booking for the next three days.</p>
        <div className="service-list">
          {services.map((service) => (
            <div key={service} className="chip">{service}</div>
          ))}
        </div>
      </section>

      <section className="panel">
        <h3>Reserve a slot</h3>
        <form onSubmit={submitBooking}>
          <label>Service</label>
          <select value={form.service} onChange={(e) => setForm({ ...form, service: e.target.value })}>
            {services.map((service) => <option key={service} value={service}>{service}</option>)}
          </select>

          <label>Available slots</label>
          <div className="slot-grid">
            {available.map((slot) => (
              <button type="button" key={`${slot.date}-${slot.time}`} className={selected === `${slot.date}-${slot.time}` ? 'slot selected' : 'slot'} onClick={() => { setSelected(`${slot.date}-${slot.time}`); setForm({ ...form, slotDate: slot.date, slotTime: slot.time }); }}>
                {slot.date} · {slot.time}
              </button>
            ))}
          </div>

          <label>Payment</label>
          <select value={form.paymentType} onChange={(e) => setForm({ ...form, paymentType: e.target.value })}>
            <option value="prepaid">Prepaid</option>
            <option value="cod">Cash on Delivery</option>
          </select>

          <label>Notes</label>
          <textarea value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} />

          <button type="submit">Confirm Reservation</button>
        </form>
        {message && <p className="message">{message}</p>}
      </section>
    </div>
  );
};

export default BookPage;

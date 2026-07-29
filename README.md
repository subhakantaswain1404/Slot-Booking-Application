<<<<<<< HEAD
# KineticAge Slot Booking App

A MERN stack slot booking app for KineticAge senior wellness and mobility services.

## Features
- Next-three-days slot availability
- Protected authentication with login/register/logout
- Booking dashboard for past and upcoming reservations
- Prepaid and Cash on Delivery payment options
- ACID-safe booking flow using MongoDB transactions and a unique slot index

## Run locally

### Backend
```bash
cd backend
npm install
npm run dev
```

### Frontend
```bash
cd frontend
npm install
npm run dev
```

The frontend expects the backend at http://localhost:5000.
=======
Create a modern, responsive Slot Booking Application with a clean UI and a scalable backend.

Requirements:

Frontend:
- Use React.js (or Next.js) with Tailwind CSS.
- Responsive design for desktop, tablet, and mobile.
- User authentication (Login/Register).
- Dashboard showing available slots.
- Calendar view for selecting dates.
- Display available time slots dynamically.
- Allow users to book, cancel, and reschedule bookings.
- Show booking history.
- Profile page for managing user details.
- Loading animations and toast notifications.
- Dark and light mode.

Backend:
- Use Node.js with Express.
- Store data in MongoDB.
- JWT authentication.
- REST APIs for:
  - User registration/login
  - Get available slots
  - Book slot
  - Cancel booking
  - Update booking
  - User bookings
- Prevent double booking.
- Validate all inputs.
- Proper error handling.

Admin Panel:
- Secure admin login.
- Create/Edit/Delete slots.
- View all bookings.
- Filter bookings by date and user.
- Block unavailable dates.
- Dashboard with booking statistics.

Database Collections:
- Users
- Slots
- Bookings

Booking Rules:
- A slot can only be booked once.
- Users cannot book past dates.
- Limit users to a configurable number of bookings per day.
- Automatically release expired reservations.
- Send confirmation after booking.

Extra Features:
- Email confirmation.
- SMS notification (optional).
- Calendar integration (Google Calendar).
- QR code for booking confirmation.
- Search and filters.
- Pagination.
- Export bookings to CSV/PDF.
- Role-based authentication (Admin/User).

UI Design:
- Modern card-based layout.
- Soft color palette.
- Icons using Lucide React.
- Smooth animations.
- Accessible components.

Project Structure:
- Organize code using best practices.
- Separate frontend and backend.
- Use reusable components.
- Environment variables for secrets.
- Include README with setup instructions.

Deliver:
1. Complete source code.
2. Database schema.
3. API documentation.
4. Installation guide.
5. Sample data.
6. Deployment instructions for Vercel (frontend) and Render/Railway (backend).
command used for running:-
npm install
npm run dev
>>>>>>> 23dd8096cf76369a6287199c7ee290c8d375b5de

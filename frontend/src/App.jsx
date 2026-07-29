import { Routes, Route, Navigate, Link } from 'react-router-dom';
import { useEffect, useState } from 'react';
import axios from 'axios';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import BookPage from './pages/BookPage';
import DashboardPage from './pages/DashboardPage';
import ServicesPage from './pages/ServicesPage';

const API = 'http://localhost:5000/api';

const App = () => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('user')) || null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');
  const [notification, setNotification] = useState('');
  const [notifications, setNotifications] = useState([]);
  const [showNotifications, setShowNotifications] = useState(false);

  useEffect(() => {
    if (token) {
      axios.defaults.headers.common.Authorization = `Bearer ${token}`;
    }
  }, [token]);

  useEffect(() => {
    document.body.dataset.theme = darkMode ? 'dark' : 'light';
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    if (!notification) return;
    const timer = window.setTimeout(() => setNotification(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notification]);

  const addNotification = (message) => {
    if (!message) return;
    setNotifications((prev) => [message, ...prev].slice(0, 8));
    setNotification(message);
    setShowNotifications(true);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken('');
    setUser(null);
    addNotification('You have been logged out.');
  };

  return (
    <div className="app-shell">
      <div className="hero-banner">
        <div>
          <p className="eyebrow">Senior wellness booking</p>
          <h1>Reserve your next recovery session</h1>
          <p>Book mobility coaching, balance support, and strength recovery with a calm, modern experience.</p>
        </div>
        <div className="hero-badges">
          <span className="hero-badge">Next 3 days</span>
          <span className="hero-badge">Flexible slots</span>
          <span className="hero-badge">Secure booking</span>
        </div>
      </div>

      <nav className="nav-bar">
        <div className="brand">KineticAge</div>
        <div className="nav-links">
          <Link to="/">Book</Link>
          <Link to="/services">Explore Services</Link>
          <Link to="/dashboard">Dashboard</Link>
          <button className="theme-toggle" onClick={() => setDarkMode((prev) => !prev)}>
            {darkMode ? '☀️ Light' : '🌙 Dark'}
          </button>
          <button className="notification-bell" onClick={() => setShowNotifications((prev) => !prev)}>
            🔔
            {notifications.length > 0 && <span className="notification-count">{notifications.length}</span>}
          </button>
          {!user ? (
            <>
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </>
          ) : (
            <button onClick={logout} className="link-btn">Logout</button>
          )}
        </div>
      </nav>

      {notification && <div className="notification">{notification}</div>}

      {showNotifications && notifications.length > 0 && (
        <div className="notification-panel">
          <div className="notification-panel-header">Recent notifications</div>
          <ul>
            {notifications.map((item, index) => (
              <li key={`${item}-${index}`}>{item}</li>
            ))}
          </ul>
        </div>
      )}

      <Routes>
        <Route path="/" element={user ? <BookPage user={user} token={token} setNotification={addNotification} /> : <Navigate to="/login" />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/login" element={!user ? <LoginPage setUser={setUser} setToken={setToken} setNotification={addNotification} /> : <Navigate to="/" />} />
        <Route path="/register" element={!user ? <RegisterPage setUser={setUser} setToken={setToken} setNotification={addNotification} /> : <Navigate to="/" />} />
        <Route path="/dashboard" element={user ? <DashboardPage user={user} token={token} /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;

// SMART API CONNECTION
// Tries to connect to Spring Boot (port 8080). If it fails, falls back to Mock LocalStorage automatically!
const BASE_URL = 'http://localhost:8080';

const getLocal = (key, defaultVal) => JSON.parse(localStorage.getItem(key)) || defaultVal;
const setLocal = (key, val) => localStorage.setItem(key, JSON.stringify(val));

// Initialize mock data if empty
if (!localStorage.getItem('events')) {
  setLocal('events', [
    { id: 1, name: 'AI & Machine Learning Workshop', category: 'Workshop', price: 25, date: 'Oct 15, 2026', location: 'Main Auditorium', imageUrl: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e' },
    { id: 2, name: 'Global Hackathon 24H', category: 'Hackathon', price: 10, date: 'Oct 16, 2026', location: 'Tech Hub', imageUrl: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d' }
  ]);
}
if (!localStorage.getItem('users')) {
  setLocal('users', [{ id: 1, name: 'Admin User', email: 'admin@festtix.com', password: 'password', role: 'admin' }]);
}

export const api = {
  // --- AUTHENTICATION ---
  register: async (userData) => {
    try {
      const response = await fetch(`${BASE_URL}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData),
      });
      if (!response.ok) throw new Error('Registration failed');
      return await response.json();
    } catch (error) {
      console.warn("Backend down. Using Mock Register.");
      const users = getLocal('users', []);
      if (users.find(u => u.email === userData.email)) throw new Error('Email already exists');
      const newUser = { id: Date.now(), role: 'user', ...userData };
      users.push(newUser);
      setLocal('users', users);
      return newUser;
    }
  },

  login: async (credentials) => {
    try {
      const response = await fetch(`${BASE_URL}/users/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(credentials),
      });
      if (!response.ok) throw new Error('Invalid credentials');
      return { email: credentials.email, role: credentials.email === 'admin@festtix.com' ? 'admin' : 'user' };
    } catch (error) {
      console.warn("Backend down. Using Mock Login.");
      const users = getLocal('users', []);
      const user = users.find(u => u.email === credentials.email && u.password === credentials.password);
      if (!user) throw new Error('Invalid credentials');
      return user;
    }
  },

  // --- EVENTS ---
  getEvents: async () => {
    try {
      const response = await fetch(`${BASE_URL}/events`);
      if (!response.ok) throw new Error('Failed to fetch events');
      return await response.json();
    } catch (error) {
      return getLocal('events', []);
    }
  },
  
  getEventById: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`);
      if (!response.ok) throw new Error('Failed to fetch event');
      return await response.json();
    } catch (error) {
      const events = getLocal('events', []);
      return events.find(e => e.id.toString() === id.toString());
    }
  },

  createEvent: async (eventData) => {
    try {
      const response = await fetch(`${BASE_URL}/events`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventData),
      });
      if (!response.ok) throw new Error('Failed to create event');
      return await response.json();
    } catch (error) {
      const events = getLocal('events', []);
      const newEvent = { id: Date.now(), ...eventData };
      events.push(newEvent);
      setLocal('events', events);
      return newEvent;
    }
  },

  deleteEvent: async (id) => {
    try {
      const response = await fetch(`${BASE_URL}/events/${id}`, {
        method: 'DELETE',
      });
      if (!response.ok) throw new Error('Failed to delete event');
      return true;
    } catch (error) {
      let events = getLocal('events', []);
      events = events.filter(e => e.id.toString() !== id.toString());
      setLocal('events', events);
      return true;
    }
  }
};

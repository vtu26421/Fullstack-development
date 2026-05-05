import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { api } from '../services/api';
import { Trash2, PlusCircle, Image as ImageIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const AdminDashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [events, setEvents] = useState([]);
  const [isAdding, setIsAdding] = useState(false);
  const [formData, setFormData] = useState({ name: '', category: 'Workshop', price: 0, date: '', location: '', imageUrl: '' });

  useEffect(() => {
    if (!user || user.role !== 'admin') {
      navigate('/dashboard'); // Not admin
    } else {
      loadEvents();
    }
  }, [user, navigate]);

  const loadEvents = async () => {
    const data = await api.getEvents();
    setEvents(data);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      await api.deleteEvent(id);
      loadEvents();
    }
  };

  const handleAddSubmit = async (e) => {
    e.preventDefault();
    await api.createEvent(formData);
    setIsAdding(false);
    setFormData({ name: '', category: 'Workshop', price: 0, date: '', location: '', imageUrl: '' });
    loadEvents();
  };

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', margin: '40px 0' }}>
        <h1 style={{ fontSize: '2.5rem' }}>Admin <span className="text-gradient">Dashboard</span></h1>
        <button className="btn btn-primary" onClick={() => setIsAdding(!isAdding)}>
          <PlusCircle size={20} style={{ marginRight: '8px' }} /> {isAdding ? 'Cancel' : 'Add New Event'}
        </button>
      </div>

      {isAdding && (
        <div className="glass-card" style={{ padding: '30px', marginBottom: '40px', border: '1px solid var(--primary)' }}>
          <h2 style={{ marginBottom: '20px' }}>Create New Event</h2>
          <form onSubmit={handleAddSubmit}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px' }}>
              <div><label>Event Name</label><input type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} /></div>
              <div>
                <label>Category</label>
                <select value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
                  <option value="Workshop">Workshop</option>
                  <option value="Hackathon">Hackathon</option>
                  <option value="Seminar">Seminar</option>
                  <option value="Conference">Conference</option>
                </select>
              </div>
              <div><label>Date</label><input type="text" required placeholder="e.g., Oct 20, 2026" value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} /></div>
              <div><label>Location</label><input type="text" required value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} /></div>
              <div><label>Price ($)</label><input type="number" required min="0" value={formData.price} onChange={e => setFormData({...formData, price: Number(e.target.value)})} /></div>
              <div>
                <label>Image URL <ImageIcon size={14} style={{display: 'inline'}} /></label>
                <input type="url" placeholder="https://..." value={formData.imageUrl} onChange={e => setFormData({...formData, imageUrl: e.target.value})} />
              </div>
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%' }}>Save Event</button>
          </form>
        </div>
      )}

      <div className="glass-card" style={{ overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ background: 'rgba(0,0,0,0.3)', borderBottom: '1px solid var(--border-color)' }}>
              <th style={{ padding: '15px 20px' }}>Event Name</th>
              <th style={{ padding: '15px 20px' }}>Date</th>
              <th style={{ padding: '15px 20px' }}>Category</th>
              <th style={{ padding: '15px 20px' }}>Price</th>
              <th style={{ padding: '15px 20px', textAlign: 'center' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map(event => (
              <tr key={event.id} style={{ borderBottom: '1px solid var(--border-color)' }}>
                <td style={{ padding: '15px 20px', fontWeight: 500 }}>{event.name}</td>
                <td style={{ padding: '15px 20px', color: 'var(--text-muted)' }}>{event.date}</td>
                <td style={{ padding: '15px 20px' }}><span style={{ padding: '4px 10px', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', borderRadius: '20px', fontSize: '0.8rem' }}>{event.category}</span></td>
                <td style={{ padding: '15px 20px' }}>${event.price}</td>
                <td style={{ padding: '15px 20px', textAlign: 'center' }}>
                  <button onClick={() => handleDelete(event.id)} style={{ background: 'transparent', border: 'none', color: '#ef4444', cursor: 'pointer', padding: '5px' }}>
                    <Trash2 size={20} />
                  </button>
                </td>
              </tr>
            ))}
            {events.length === 0 && <tr><td colSpan="5" style={{ padding: '30px', textAlign: 'center', color: 'var(--text-muted)' }}>No events found.</td></tr>}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminDashboard;

import { Link } from 'react-router-dom';
import { Calendar, MapPin } from 'lucide-react';

const EventCard = ({ event }) => {
  return (
    <div className="glass-card" style={{ overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      <div style={{ height: '200px', backgroundColor: 'var(--glass-bg)', overflow: 'hidden' }}>
        <img 
          src={event.imageUrl || `https://source.unsplash.com/random/800x600/?${event.category || 'event'},technology`} 
          alt={event.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
          onError={(e) => { e.target.src = 'https://via.placeholder.com/800x600?text=Event' }}
        />
      </div>
      <div style={{ padding: '20px', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
          <span style={{ fontSize: '0.8rem', padding: '4px 10px', background: 'rgba(139, 92, 246, 0.2)', color: 'var(--primary)', borderRadius: '20px', fontWeight: 600 }}>
            {event.category || 'Tech'}
          </span>
          <span style={{ fontWeight: 700, color: 'var(--secondary)' }}>${event.price || 0}</span>
        </div>
        <h3 style={{ marginBottom: '15px', fontSize: '1.25rem' }}>{event.name}</h3>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '8px', fontSize: '0.9rem' }}>
          <Calendar size={16} /> <span>{event.date || 'TBA'}</span>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--text-muted)', marginBottom: '20px', fontSize: '0.9rem' }}>
          <MapPin size={16} /> <span>{event.location || 'Campus'}</span>
        </div>
        
        <Link to={`/event/${event.id || 1}`} className="btn btn-primary" style={{ marginTop: 'auto', width: '100%' }}>
          View Details
        </Link>
      </div>
    </div>
  );
};

export default EventCard;

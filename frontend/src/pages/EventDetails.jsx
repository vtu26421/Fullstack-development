import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Calendar, MapPin, Clock, Tag, ShieldCheck } from 'lucide-react';
import { api } from '../services/api';

const EventDetails = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  
  useEffect(() => {
    api.getEventById(id).then(data => setEvent(data)).catch(console.error);
  }, [id]);

  if (!event) return <div className="container" style={{ padding: '100px 0', textAlign: 'center' }}>Loading...</div>;

  return (
    <div className="container" style={{ paddingBottom: '60px' }}>
      <div className="glass-card" style={{ marginTop: '20px', overflow: 'hidden' }}>
        <div style={{ height: '350px', position: 'relative' }}>
          <img 
            src={event.imageUrl || "https://source.unsplash.com/random/1200x400/?technology"} 
            alt={event.name} 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            onError={(e) => { e.target.src = 'https://via.placeholder.com/1200x400?text=Event+Banner' }}
          />
          <div style={{ 
            position: 'absolute', bottom: 0, left: 0, right: 0, 
            background: 'linear-gradient(to top, rgba(15,23,42,1), transparent)', 
            padding: '40px 20px 20px 20px'
          }}>
            <span style={{ background: 'var(--primary)', color: 'white', padding: '5px 12px', borderRadius: '20px', fontSize: '0.9rem', fontWeight: 600 }}>
              {event.category}
            </span>
            <h1 style={{ fontSize: '3rem', marginTop: '10px' }}>{event.name}</h1>
          </div>
        </div>
        
        <div style={{ padding: '40px', display: 'flex', gap: '40px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 600px' }}>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>About This Event</h3>
            <p style={{ color: 'var(--text-muted)', lineHeight: 1.8, fontSize: '1.1rem', marginBottom: '30px' }}>
              Join us for an incredible experience at the {event.name}. This {event.category} will feature expert speakers, hands-on sessions, and networking opportunities.
            </p>
            
            <h3 style={{ fontSize: '1.5rem', marginBottom: '20px' }}>Organized By</h3>
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
                T
              </div>
              <div>
                <h4 style={{ fontSize: '1.1rem' }}>Tech Society</h4>
                <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Verified Organizer <ShieldCheck size={14} color="var(--primary)" style={{display: 'inline'}} /></p>
              </div>
            </div>
          </div>
          
          <div style={{ flex: '1 1 300px' }}>
            <div className="glass" style={{ padding: '30px', borderRadius: '16px' }}>
              <h3 style={{ fontSize: '1.8rem', marginBottom: '20px', color: 'var(--secondary)' }}>${event.price} <span style={{ fontSize: '1rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ ticket</span></h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                  <Calendar size={20} color="var(--primary)" /> <span>{event.date}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                  <MapPin size={20} color="var(--primary)" /> <span>{event.location}</span>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: 'var(--text-muted)' }}>
                  <Tag size={20} color="var(--primary)" /> <span>General Admission</span>
                </div>
              </div>
              
              <Link to={`/checkout/${event.id}`} className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.1rem' }}>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventDetails;

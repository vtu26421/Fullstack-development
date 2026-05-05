import { useState, useEffect } from 'react';
import Hero from '../components/Hero';
import EventCard from '../components/EventCard';
import { api } from '../services/api';

const Home = () => {
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    api.getEvents()
      .then(data => {
        setEvents(data);
        setIsLoading(false);
      })
      .catch(err => {
        console.error(err);
        setIsLoading(false);
      });
  }, []);

  return (
    <div className="container">
      <Hero />
      
      <div style={{ marginBottom: '40px' }}>
        <h2 style={{ fontSize: '2rem', marginBottom: '30px' }}>Trending <span className="text-gradient">Events</span></h2>
        
        {isLoading ? (
          <div style={{ textAlign: 'center', padding: '50px', color: 'var(--text-muted)' }}>Loading events...</div>
        ) : (
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
            gap: '30px' 
          }}>
            {events.map(evt => (
              <EventCard key={evt.id} event={evt} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;

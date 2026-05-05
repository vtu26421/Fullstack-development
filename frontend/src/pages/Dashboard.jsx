import { Ticket, Calendar, MapPin } from 'lucide-react';

const Dashboard = () => {
  // Mock user bookings
  const bookings = [
    { id: 'BKG-10492', eventName: 'AI & Machine Learning Workshop', date: 'Oct 15, 2026', location: 'Main Auditorium', status: 'Confirmed' },
    { id: 'BKG-10493', eventName: 'Global Hackathon 24H', date: 'Oct 16, 2026', location: 'Tech Hub', status: 'Confirmed' }
  ];

  return (
    <div className="container">
      <h1 style={{ fontSize: '2.5rem', margin: '40px 0 30px 0' }}>My <span className="text-gradient">Dashboard</span></h1>
      
      <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '40px' }}>
        <div>
          <div className="glass-card" style={{ padding: '30px', textAlign: 'center' }}>
            <div style={{ width: '100px', height: '100px', borderRadius: '50%', background: 'linear-gradient(135deg, var(--primary), var(--secondary))', margin: '0 auto 20px auto', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '2.5rem', fontWeight: 'bold' }}>
              JD
            </div>
            <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>John Doe</h3>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>john@example.com</p>
            <button className="btn btn-outline" style={{ width: '100%' }}>Edit Profile</button>
          </div>
        </div>
        
        <div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '20px' }}>Upcoming Tickets</h2>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {bookings.map(booking => (
              <div key={booking.id} className="glass" style={{ padding: '20px', borderRadius: '16px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <div style={{ background: 'rgba(139, 92, 246, 0.1)', padding: '15px', borderRadius: '12px', color: 'var(--primary)' }}>
                    <Ticket size={32} />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1.2rem', marginBottom: '8px' }}>{booking.eventName}</h3>
                    <div style={{ display: 'flex', gap: '15px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Calendar size={14} /> {booking.date}</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><MapPin size={14} /> {booking.location}</span>
                    </div>
                  </div>
                </div>
                
                <div style={{ textAlign: 'right' }}>
                  <div style={{ color: '#10b981', fontWeight: 600, marginBottom: '5px' }}>{booking.status}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{booking.id}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;


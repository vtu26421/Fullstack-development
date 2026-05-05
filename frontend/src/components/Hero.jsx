import { Search } from 'lucide-react';

const Hero = () => {
  return (
    <div style={{ padding: '100px 0 60px 0', textAlign: 'center' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '20px' }}>
        Discover the <span className="text-gradient">Best Events</span><br />
        in Tech Fest 2026
      </h1>
      <p style={{ color: 'var(--text-muted)', fontSize: '1.2rem', maxWidth: '600px', margin: '0 auto 40px auto' }}>
        Book your tickets for workshops, hackathons, and guest lectures seamlessly with FestTix.
      </p>
      
      <div className="glass" style={{ maxWidth: '600px', margin: '0 auto', padding: '10px', borderRadius: '50px', display: 'flex', alignItems: 'center' }}>
        <Search style={{ margin: '0 15px', color: 'var(--text-muted)' }} />
        <input 
          type="text" 
          placeholder="Search for events..." 
          style={{ background: 'transparent', border: 'none', boxShadow: 'none', padding: '10px 0', fontSize: '1.1rem' }}
        />
        <button className="btn btn-primary" style={{ borderRadius: '40px', padding: '12px 30px' }}>
          Search
        </button>
      </div>
    </div>
  );
};

export default Hero;


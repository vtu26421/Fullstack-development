const Footer = () => {
  return (
    <footer style={{ marginTop: '80px', padding: '40px 0', borderTop: '1px solid var(--border-color)', textAlign: 'center' }}>
      <div className="container">
        <h3 className="text-gradient" style={{ marginBottom: '10px' }}>FestTix</h3>
        <p style={{ color: 'var(--text-muted)' }}>© 2026 Technical Fest Ticket Booking System. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;


import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { CheckCircle } from 'lucide-react';

const Checkout = () => {
  const { id } = useParams();
  const [step, setStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePayment = (e) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      setStep(2);
    }, 2000);
  };

  if (step === 2) {
    return (
      <div className="container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <div className="glass-card" style={{ padding: '50px', textAlign: 'center', maxWidth: '500px' }}>
          <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 20px auto' }} />
          <h2 style={{ fontSize: '2rem', marginBottom: '15px' }}>Booking Successful!</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Your ticket for Event #{id} has been confirmed. A digital copy has been sent to your email.</p>
          <Link to="/dashboard" className="btn btn-primary">Go to Dashboard</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div style={{ maxWidth: '800px', margin: '40px auto' }}>
        <h1 style={{ fontSize: '2.5rem', marginBottom: '30px' }}>Secure Checkout</h1>
        
        <div className="glass-card" style={{ padding: '30px' }}>
          <form onSubmit={handlePayment}>
            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Attendee Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '30px' }}>
              <div>
                <label>First Name</label>
                <input type="text" required placeholder="John" />
              </div>
              <div>
                <label>Last Name</label>
                <input type="text" required placeholder="Doe" />
              </div>
              <div style={{ gridColumn: '1 / -1' }}>
                <label>Email Address</label>
                <input type="email" required placeholder="john@example.com" />
              </div>
            </div>

            <h3 style={{ marginBottom: '20px', borderBottom: '1px solid var(--border-color)', paddingBottom: '10px' }}>Payment Details</h3>
            <div style={{ marginBottom: '30px' }}>
              <div style={{ marginBottom: '15px' }}>
                <label>Card Number</label>
                <input type="text" required placeholder="0000 0000 0000 0000" />
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
                <div>
                  <label>Expiry Date</label>
                  <input type="text" required placeholder="MM/YY" />
                </div>
                <div>
                  <label>CVC</label>
                  <input type="text" required placeholder="123" />
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }} disabled={isProcessing}>
              {isProcessing ? 'Processing Payment...' : 'Pay & Confirm Booking'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;


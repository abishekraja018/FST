import { useState, useEffect } from 'react';
import axios from '../api';

const AdminDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true); // 🆕 Controls the welcome message
  const [view, setView] = useState('cert-list');
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });
  const [verifyId, setVerifyId] = useState('');
  const [verifyResult, setVerifyResult] = useState(null);

  const fetchCerts = async () => {
    const res = await axios.get('/certificates');
    setCerts(res.data);
  };

  const issueCert = async () => {
    try {
      await axios.post('/certificates/issue', form);
      alert('Certificate issued');
      fetchCerts();
    } catch (err) {
      alert('Error issuing certificate');
    }
  };

  const issueLOR = async () => {
    try {
      await axios.post('/certificates/issue-lor', form);
      alert('LOR issued');
    } catch (err) {
      alert('Error issuing LOR');
    }
  };

  const verifyCert = async () => {
    try {
      const res = await axios.get(`/certificates/verify/${verifyId}`);
      setVerifyResult(res.data);
    } catch {
      setVerifyResult({ error: 'Not found' });
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  if (showWelcome) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>🛡️ Welcome, Admin!</h2>
        <p>You are now logged in to the Admin Panel.</p>
        <button
          onClick={() => setShowWelcome(false)}
          style={{
            padding: '0.8rem 2rem',
            marginTop: '1.5rem',
            backgroundColor: '#4CAF50',
            color: '#fff',
            border: 'none',
            borderRadius: '8px',
            fontSize: '16px',
            cursor: 'pointer',
          }}
        >
          Continue to Dashboard
        </button>
      </div>
    );
  }

  return (
    <div className="page" style={{ padding: '2rem' }}>
      <h2>🛡️ Admin Dashboard</h2>

      <div style={{ margin: '1rem 0' }}>
        <button onClick={() => setView('issue-cert')}>Issue Certificate</button>
        <button onClick={() => setView('verify-cert')}>Verify Certificate</button>
        <button onClick={() => setView('cert-list')}>View All Certificates</button>
        <button onClick={() => setView('issue-lor')}>Issue LOR</button>
      </div>

      {view === 'issue-cert' && (
        <div>
          <h3>Issue Certificate</h3>
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <button onClick={issueCert}>Issue Certificate</button>
        </div>
      )}

      {view === 'verify-cert' && (
        <div>
          <h3>Verify Certificate</h3>
          <input placeholder="Certificate ID" onChange={e => setVerifyId(e.target.value)} />
          <button onClick={verifyCert}>Verify</button>
          {verifyResult && (
            <pre style={{ textAlign: 'left' }}>{JSON.stringify(verifyResult, null, 2)}</pre>
          )}
        </div>
      )}

      {view === 'cert-list' && (
        <div>
          <h3>All Issued Certificates</h3>
          <ul>
            {certs.map(cert => (
              <li key={cert._id}>
                {cert.name} — {cert.certificateId}
              </li>
            ))}
          </ul>
        </div>
      )}

      {view === 'issue-lor' && (
        <div>
          <h3>Issue LOR</h3>
          <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
          <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
          <button onClick={issueLOR}>Issue LOR</button>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;

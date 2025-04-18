import { useState, useEffect } from 'react';
import axios from '../api';

const AdminDashboard = () => {
  const [certs, setCerts] = useState([]);
  const [form, setForm] = useState({ name: '', email: '' });

  const fetchCerts = async () => {
    const res = await axios.get('/certificates');
    setCerts(res.data);
  };

  const issueCert = async () => {
    try {
      await axios.post('/certificates/issue', form);
      alert('Certificate issued');
      setForm({ name: '', email: '' });
      fetchCerts();
    } catch (err) {
      alert('Error issuing certificate');
    }
  };

  useEffect(() => {
    fetchCerts();
  }, []);

  return (
    <div className="page">
      <h2>Admin Dashboard</h2>

      <div>
        <h3>Issue Certificate</h3>
        <input placeholder="Name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
        <input placeholder="Email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} />
        <button onClick={issueCert}>Issue</button>
      </div>

      <hr />

      <ul>
        {certs.map(cert => (
          <li key={cert._id}>
            {cert.name} - {cert.certificateId}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AdminDashboard;

import { useEffect, useState } from 'react';
import axios from '../api';
import jwtDecode from 'jwt-decode';

const StudentDashboard = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [certs, setCerts] = useState([]);
  const [studentEmail, setStudentEmail] = useState('');

  const fetchMyCertificates = async (email) => {
    try {
      const res = await axios.get('/certificates'); // get all
      const myCerts = res.data.filter((cert) => cert.email === email);
      setCerts(myCerts);
    } catch (err) {
      alert('Failed to fetch certificates');
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      const email = decoded.email;
      setStudentEmail(email);
      fetchMyCertificates(email);
    }
  }, []);

  if (showWelcome) {
    return (
      <div className="page" style={{ textAlign: 'center', paddingTop: '4rem' }}>
        <h2>🎓 Welcome, Student!</h2>
        <p>You are now logged in to your student dashboard.</p>
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
          View My Certificates
        </button>
      </div>
    );
  }

  return (
    <div className="page" style={{ padding: '2rem' }}>
      <h2>🎓 My Certificates</h2>
      {certs.length === 0 ? (
        <p>No certificates found for {studentEmail}</p>
      ) : (
        <ul>
          {certs.map((cert) => (
            <li key={cert._id}>
              {cert.name} — {cert.certificateId}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default StudentDashboard;

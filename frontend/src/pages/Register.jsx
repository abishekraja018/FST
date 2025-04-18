import { useState } from 'react';
import axios from '../api';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });

  const register = async () => {
    try {
      await axios.post('/auth/register', form);
      alert('Registered');
    } catch {
      alert('Error');
    }
  };

  return (
    <div className="page">
      <h2>Register</h2>
      <input placeholder="Name" onChange={e => setForm({ ...form, name: e.target.value })} />
      <input placeholder="Email" onChange={e => setForm({ ...form, email: e.target.value })} />
      <input type="password" placeholder="Password" onChange={e => setForm({ ...form, password: e.target.value })} />
      <button onClick={register}>Register</button>
    </div>
  );
};

export default Register;

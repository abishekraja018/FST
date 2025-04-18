import { useState } from 'react';
import axios from '../api';
import "../App.css";

const VerifyCertificate = () => {
  const [certId, setCertId] = useState('');
  const [result, setResult] = useState(null);

  const verify = async () => {
    try {
      const res = await axios.get(`/certificates/verify/${certId}`);
      setResult(res.data);
    } catch {
      setResult({ error: 'Not found' });
    }
  };

  return (
    <div className="page">
      <h2>Verify Certificate</h2>
      <input placeholder="Certificate ID" onChange={e => setCertId(e.target.value)} />
      <button onClick={verify}>Verify</button>
      {result && <pre>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
};

export default VerifyCertificate;

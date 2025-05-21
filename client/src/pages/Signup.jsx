import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirm) {
      alert("Passwords do not match");
      return;
    }

    // TODO: Send to backend
    try {
      const response = await fetch('http://127.0.0.1:5000/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        navigate('/login');
      } else {
        const data = await response.json();
        alert(data.message || 'Signup failed');
      }
    } catch (err) {
      console.error('Signup error:', err);
      alert('Error signing up');
    }
  };

  return (
    <div className="page signup-form">
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required 
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required 
          />
        </label>
        <label>
          Confirm Password:
          <input 
            type="password" 
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            required 
          />
        </label>
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
}

export default Signup;

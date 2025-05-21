import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    try {
      const response = await fetch('http://127.0.0.1:5000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Login success:', data);
        // TODO: Save auth token or user info if needed

        // Redirect to chat or home page after login
        navigate('/Chat');
      } else {
        setErrorMsg('Login failed. Please check your email and password.');
      }
    } catch (error) {
      console.error('Login error:', error);
      setErrorMsg('An error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="page login-form">
      <h1>Login</h1>
      <p>Please log in to access the chatbot.</p>
      <form onSubmit={handleSubmit}>
        <label>
          Email:
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={loading}
          />
        </label>
        <label>
          Password:
          <input 
            type="password" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            disabled={loading}
          />
        </label>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
      </form>
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}
      <p>
        Don't have an account? <Link to="/signup">Create one</Link>
      </p>
    </div>
  );
}

export default Login;

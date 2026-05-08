import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './context/AuthContext';
import { Lock, User } from 'lucide-react';
import { toast } from 'react-toastify';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password, navigate);
    if (!success) {
      toast.error('Invalid credentials');
    } else {
      toast.success('Logged in successfully');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f8f9fa' }}>
      <div style={{ maxWidth: '400px', width: '100%', padding: '40px', backgroundColor: '#fff', borderRadius: '10px', boxShadow: '0 4px 6px rgba(0,0,0,0.1)' }}>
        <div style={{ textAlign: 'center', marginBottom: '30px' }}>
          <h2 style={{ color: '#333', fontSize: '24px', fontWeight: 'bold' }}>Admin Login</h2>
          <p style={{ color: '#666', fontSize: '14px', marginTop: '10px' }}>Sign in to manage your store</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '20px' }}>
            <div style={{ position: 'relative' }}>
              <User style={{ position: 'absolute', top: '12px', left: '12px', color: '#999', width: '20px', height: '20px' }} />
              <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
              />
            </div>
          </div>
          
          <div style={{ marginBottom: '30px' }}>
            <div style={{ position: 'relative' }}>
              <Lock style={{ position: 'absolute', top: '12px', left: '12px', color: '#999', width: '20px', height: '20px' }} />
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                style={{ width: '100%', padding: '10px 10px 10px 40px', borderRadius: '5px', border: '1px solid #ddd', fontSize: '16px' }}
              />
            </div>
          </div>
          
          <button
            type="submit"
            style={{ width: '100%', padding: '12px', backgroundColor: '#2b8f32', color: 'white', border: 'none', borderRadius: '5px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}
          >
            Sign In
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;

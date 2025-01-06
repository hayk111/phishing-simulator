import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

interface LoginProps {
  setToken: (token: string) => void;
}

const Login: React.FC<LoginProps> = ({ setToken }) => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/auth/login', {
        email,
        password,
      });
      setToken(response.data.access_token);
      navigate('/phishing-simulation');
    } catch (error) {
      console.error('Login failed', error);
      alert('Login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Login</h2>
        <form onSubmit={handleSubmit} className="mt-4">
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <div className="mt-4 text-center">
            <Link to="/register" className="text-blue-500 hover:underline">
              Don't have an account? Register
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;

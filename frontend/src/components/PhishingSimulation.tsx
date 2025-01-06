import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface PhishingAttempt {
  _id: string;
  email: string;
  message: string;
  clicked: boolean;
}

interface PhishingSimulationProps {
  token: string;
}

const PhishingSimulation: React.FC<PhishingSimulationProps> = ({ token }) => {
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [attempts, setAttempts] = useState<PhishingAttempt[]>([]);

  useEffect(() => {
    const fetchAttempts = async () => {
      try {
        const response = await axios.get('http://localhost:3001/attempts', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAttempts(response.data);
      } catch (error) {
        console.error('Failed to fetch attempts', error);
      }
    };

    fetchAttempts();
  }, [token]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await axios.post(
        'http://localhost:3001/attempts/send',
        { email, message },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      alert('Phishing email sent');
    } catch (error) {
      console.error('Failed to send phishing email', error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.reload();
  };

  return (
    <div className="relative max-w-2xl mx-auto mt-[200px]">
      <button
        onClick={handleLogout}
        className="absolute top-[-100px] left-0 px-3 py-2 text-white bg-red-500 rounded-lg hover:bg-red-600"
      >
        Logout
      </button>
      <div className="p-5 mb-5 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center">Send Phishing Email</h2>
        <form onSubmit={handleSend} className="mt-4">
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
            <label className="block text-gray-700">Message</label>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:border-blue-300"
            />
          </div>
          <button
            type="submit"
            className="w-full px-3 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600"
          >
            Send Phishing Email
          </button>
        </form>
      </div>
      <div className="overflow-x-auto bg-white rounded-lg shadow-md">
        <table className="min-w-full bg-white">
          <thead>
            <tr>
              <th className="px-4 py-2 text-left">Email</th>
              <th className="px-4 py-2 text-left">Message</th>
              <th className="px-4 py-2 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {attempts.map((attempt) => (
              <tr key={attempt._id}>
                <td className="px-4 py-2 border">{attempt.email}</td>
                <td className="px-4 py-2 border">{attempt.message}</td>
                <td className="px-4 py-2 border">
                  {attempt.clicked ? 'Clicked' : 'Not Clicked'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PhishingSimulation;

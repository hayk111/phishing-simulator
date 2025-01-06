import { useState, useEffect } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import PhishingSimulation from './components/PhishingSimulation';

const App = () => {
  const [token, setToken] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
    if (storedToken) {
      setToken(storedToken);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSetToken = (token: string) => {
    setToken(token);
    localStorage.setItem('token', token);
  };

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login setToken={handleSetToken} />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/phishing-simulation"
          element={
            token ? (
              <PhishingSimulation token={token} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
        <Route
          path="*"
          element={<Navigate to={token ? '/phishing-simulation' : '/login'} />}
        />
      </Routes>
    </Router>
  );
};

export default App;

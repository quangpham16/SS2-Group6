import { useState } from 'react';
import { Navigate, Route, Routes, useNavigate } from 'react-router-dom';

import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem('ainotes_user');

    if (!savedUser) {
      return null;
    }

    try {
      return JSON.parse(savedUser);
    } catch {
      localStorage.removeItem('ainotes_user');
      localStorage.removeItem('ainotes_token');
      return null;
    }
  });

  const handleAuthSuccess = (user) => {
    setCurrentUser(user);
    navigate('/dashboard', { replace: true });
  };

  const handleLogout = () => {
    localStorage.removeItem('ainotes_user');
    localStorage.removeItem('ainotes_token');
    setCurrentUser(null);
    navigate('/login', { replace: true });
  };

  return (
    <Routes>
      <Route
        path="/"
        element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />}
      />
      <Route
        path="/login"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/register"
        element={
          currentUser ? (
            <Navigate to="/dashboard" replace />
          ) : (
            <Auth onAuthSuccess={handleAuthSuccess} />
          )
        }
      />
      <Route
        path="/dashboard"
        element={
          currentUser ? (
            <Home user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="/notes/:documentId"
        element={
          currentUser ? (
            <Home user={currentUser} onLogout={handleLogout} />
          ) : (
            <Navigate to="/login" replace />
          )
        }
      />
      <Route
        path="*"
        element={<Navigate to={currentUser ? '/dashboard' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;

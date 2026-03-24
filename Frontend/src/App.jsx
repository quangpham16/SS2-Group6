import { useState } from 'react';

import Auth from './pages/Auth';
import Home from './pages/Home';

function App() {
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
  };

  const handleLogout = () => {
    localStorage.removeItem('ainotes_user');
    localStorage.removeItem('ainotes_token');
    setCurrentUser(null);
  };

  return currentUser ? (
    <Home user={currentUser} onLogout={handleLogout} />
  ) : (
    <Auth onAuthSuccess={handleAuthSuccess} />
  );
}

export default App;

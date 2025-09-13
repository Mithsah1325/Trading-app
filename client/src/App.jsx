import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import { useLocalStorage } from './hooks/useLocalStorage';
import Login from './pages/Login';
import Register from './pages/Register';

const API_BASE = 'http://localhost:5000'; // or use env variable

function App() {
  const [activeSection, setActiveSection] = useState('lessons');
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showRegister, setShowRegister] = useState(false); // toggle register/login

  const [userProgress, setUserProgress] = useLocalStorage('userProgress', {
    completedLessons: 3,
    totalLessons: 6,
    simulatedTrades: 12,
    quizAverage: 78,
    achievements: ['firstTrade', 'knowledgeSeeker', 'quizMaster']
  });

  // Load user if token exists
  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('token');
      if (token) {
        try {
          const res = await axios.get(`${API_BASE}/api/me`, {
            headers: { Authorization: `Bearer ${token}` },
          });
          setUser(res.data);
        } catch (err) {
          console.error("Failed to fetch user:", err);
          localStorage.removeItem('token');
          setUser(null);
        }
      }
      setLoading(false);
    };
    fetchUser();
  }, []);

  // Save progress
  const saveProgress = async (progressUpdate) => {
    setUserProgress(progressUpdate);
    if (user) {
      try {
        const token = localStorage.getItem('token');
        await axios.post(`${API_BASE}/api/progress`, progressUpdate, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } catch (err) {
        console.error('Failed to sync with server:', err);
      }
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;

  if (!user) {
    return (
      <div className="min-h-screen flex flex-col justify-center items-center bg-gray-100 text-black">
        <h1 className="text-3xl font-bold mb-6">📈 Options Trading Challenge</h1>
        
        {/* Toggle buttons */}
        <div className="flex gap-4 mb-6">
          <button 
            onClick={() => setShowRegister(false)} 
            className={`px-4 py-2 rounded ${!showRegister ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}
          >
            Login
          </button>
          <button 
            onClick={() => setShowRegister(true)} 
            className={`px-4 py-2 rounded ${showRegister ? 'bg-green-500 text-white' : 'bg-gray-300'}`}
          >
            Register
          </button>
        </div>

        {/* Show one form at a time */}
        {showRegister ? <Register setUser={setUser} /> : <Login setUser={setUser} />}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 text-black">
      <div className="max-w-6xl mx-auto px-4 py-8">
        <Header user={user} setUser={setUser} />
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <MainContent 
          activeSection={activeSection} 
          userProgress={userProgress}
          setUserProgress={saveProgress}
        />
      </div>
    </div>
  );
}

export default App;

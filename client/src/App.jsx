import React, { useState } from 'react';
import Header from './components/Header';
import Navigation from './components/Navigation';
import MainContent from './components/MainContent';
import { useLocalStorage } from './hooks/useLocalStorage';

function App() {
  const [activeSection, setActiveSection] = useState('lessons');
  const [userProgress, setUserProgress] = useLocalStorage('userProgress', {
    completedLessons: 3,
    totalLessons: 6,
    simulatedTrades: 12,
    quizAverage: 78,
    achievements: ['firstTrade', 'knowledgeSeeker', 'quizMaster']
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 via-purple-600 to-purple-800">
      <div className="max-w-6xl mx-auto px-4 py-6">
        <Header />
        <Navigation activeSection={activeSection} setActiveSection={setActiveSection} />
        <MainContent 
          activeSection={activeSection} 
          userProgress={userProgress}
          setUserProgress={setUserProgress}
        />
      </div>
    </div>
  );
}

export default App;
// MainContent.jsx
import React from 'react';
import LessonsSection from './Lessons/LessonsSection';
import SimulatorSection from './simulator/SimulatorSection';
import QuizSection from './quiz/QuizSection';
import ProgressSection from './progress/ProgressSection';
import GlossarySection from './glossary/GlossarySection';

const MainContent = ({ activeSection, userProgress, setUserProgress }) => {
  const renderContent = () => {
    switch (activeSection) {
      case 'lessons':
        return <LessonsSection />;
      case 'simulator':
        return <SimulatorSection />;
      case 'quiz':
        return <QuizSection />;
      case 'progress':
        return <ProgressSection userProgress={userProgress} />;
      case 'glossary':
        return <GlossarySection />;
      default:
        return <LessonsSection />;
    }
  };

  return (
    <div className="bg-white text-black rounded-2xl shadow-lg p-6 md:p-8 my-8">
      {renderContent()}
    </div>
  );
};

export default MainContent;

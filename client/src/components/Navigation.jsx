// Navigation.jsx
import React from 'react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'lessons', label: '📚 Lessons' },
    { id: 'simulator', label: '🎮 Simulator' },
    { id: 'quiz', label: '🧠 Quiz' },
    { id: 'progress', label: '📊 Progress' },
    { id: 'glossary', label: '📖 Glossary' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-4 mb-8">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`px-6 py-3 rounded-full font-medium transition-transform duration-300 border ${
            activeSection === item.id
              ? 'bg-white text-blue-600 border-gray-300 shadow-md transform -translate-y-1'
              : 'bg-white text-black border-gray-300 hover:bg-gray-100 hover:shadow-sm'
          }`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;

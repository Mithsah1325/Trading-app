import React from 'react';

const Navigation = ({ activeSection, setActiveSection }) => {
  const navItems = [
    { id: 'lessons', label: '📚 Lessons', icon: '📚' },
    { id: 'simulator', label: '🎮 Simulator', icon: '🎮' },
    { id: 'quiz', label: '🧠 Quiz', icon: '🧠' },
    { id: 'progress', label: '📊 Progress', icon: '📊' },
    { id: 'glossary', label: '📖 Glossary', icon: '📖' }
  ];

  return (
    <div className="flex flex-wrap justify-center gap-3 mb-8">
      {navItems.map(item => (
        <button
          key={item.id}
          onClick={() => setActiveSection(item.id)}
          className={`px-6 py-3 rounded-full font-medium transition-all duration-300 backdrop-blur-md ${
            activeSection === item.id
             ? 'bg-white bg-opacity-30 text-black transform -translate-y-1 shadow-lg'
             : 'bg-white bg-opacity-20 text-gray-800 hover:bg-opacity-30 hover:text-black hover:transform hover:-translate-y-1'
}`}
        >
          {item.label}
        </button>
      ))}
    </div>
  );
};

export default Navigation;
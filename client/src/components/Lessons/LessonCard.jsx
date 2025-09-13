import React, { useState } from 'react';
import LessonModal from './LessonModal';

const LessonCard = ({ lesson }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <>
      <div
        className="bg-gradient-to-br from-pink-400 to-red-500 text-white p-6 rounded-2xl cursor-pointer transition-all duration-300 hover:transform hover:-translate-y-2 hover:shadow-2xl"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-xl font-bold mb-3">{lesson.title}</h3>
        <p className="text-sm opacity-90 mb-4">{lesson.description}</p>
        <div className="flex justify-between items-center">
          <span className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyColor(lesson.difficulty)}`}>
            {lesson.difficulty}
          </span>
          <span className="text-xs opacity-75">{lesson.duration}</span>
        </div>
      </div>

      {isModalOpen && (
        <LessonModal
          key={lesson.id} // ✅ ensures React remounts modal for different lessons
          lesson={lesson}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default LessonCard;

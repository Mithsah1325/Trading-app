import React, { useState } from 'react';
import LessonModal from './LessonModal';

const LessonCard = ({ lesson }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getDifficultyClasses = (difficulty) => {
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
        className="bg-white text-black p-6 rounded-2xl cursor-pointer transition-transform duration-300 transform hover:-translate-y-1 hover:shadow-lg border border-gray-200"
        onClick={() => setIsModalOpen(true)}
      >
        <h3 className="text-xl font-bold mb-3">{lesson.title}</h3>
        <p className="text-sm opacity-90 mb-4">{lesson.description}</p>
        <div className="flex justify-between items-center">
          <span
            className={`px-3 py-1 rounded-full text-xs font-medium ${getDifficultyClasses(
              lesson.difficulty
            )}`}
          >
            {lesson.difficulty}
          </span>
          <span className="text-xs opacity-75">{lesson.duration}</span>
        </div>
      </div>

      {isModalOpen && (
        <LessonModal
          key={lesson.id}
          lesson={lesson}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
};

export default LessonCard;

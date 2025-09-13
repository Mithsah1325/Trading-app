import React from 'react';
import LessonCard from './LessonCard';
import { lessons } from '../../data/lessons';

const LessonsSection = () => {
  return (
    <div className="py-12 bg-white text-black rounded-2xl shadow-lg p-6 md:p-8">
      {/* Section Title */}
      <h2 className="text-4xl md:text-5xl font-extrabold text-center text-blue-600 mb-12 drop-shadow-md">
        Learning Path
      </h2>

      {/* Lessons Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonsSection;

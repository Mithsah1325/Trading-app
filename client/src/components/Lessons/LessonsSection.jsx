import React from 'react';
import LessonCard from './LessonCard';
import { lessons } from '../../data/lessons';

const LessonsSection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Learning Path</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {lessons.map(lesson => (
          <LessonCard key={lesson.id} lesson={lesson} />
        ))}
      </div>
    </div>
  );
};

export default LessonsSection;

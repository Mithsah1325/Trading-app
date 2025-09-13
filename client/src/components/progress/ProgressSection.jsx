import React from 'react';
import { achievements } from '../../data/achievements';

const ProgressSection = ({ userProgress }) => {
  const progressPercentage = (userProgress.completedLessons / userProgress.totalLessons) * 100;

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Your Learning Progress</h2>
      
      <div className="text-center mb-8">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Overall Progress</h3>
        <div className="w-full bg-gray-200 rounded-full h-6 mb-4 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-blue-600 h-full rounded-full transition-all duration-1000 ease-out"
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
        <p className="text-lg font-medium text-gray-600">{progressPercentage.toFixed(0)}% Complete</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {achievements.map(achievement => (
          <div 
            key={achievement.id}
            className={`p-6 rounded-2xl text-center ${
              userProgress.achievements.includes(achievement.id)
                ? 'bg-gradient-to-br from-yellow-400 to-orange-500 text-white'
                : 'bg-gray-100 text-gray-500'
            }`}
          >
            <h4 className="font-bold text-lg mb-2">{achievement.title}</h4>
            <p className="text-sm">{achievement.description}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-50 rounded-2xl p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-700 mb-4">Learning Statistics</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <p className="text-2xl font-bold text-blue-600">{userProgress.completedLessons}/{userProgress.totalLessons}</p>
            <p className="text-sm text-gray-600">Lessons Completed</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-green-600">{userProgress.simulatedTrades}</p>
            <p className="text-sm text-gray-600">Simulated Trades</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-purple-600">{userProgress.quizAverage}%</p>
            <p className="text-sm text-gray-600">Quiz Average</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-orange-600">2.5h</p>
            <p className="text-sm text-gray-600">Time Spent Learning</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProgressSection;
import React from 'react';

const QuizQuestion = ({ question, questionIndex, selectedAnswer, onAnswerSelect, showResult }) => (
  <div className="bg-gray-50 rounded-2xl p-6 mb-6">
    <h4 className="text-lg font-semibold text-gray-800 mb-4">
      Question {questionIndex + 1}: {question.question}
    </h4>
    <div className="space-y-2">
      {question.options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerSelect(questionIndex, index)}
          className={`w-full p-3 text-left rounded-lg transition-all duration-300 ${
            selectedAnswer === index
              ? showResult
                ? index === question.correct
                  ? 'bg-green-100 text-green-800 border border-green-300'
                  : 'bg-red-100 text-red-800 border border-red-300'
                : 'bg-blue-100 text-blue-800 border border-blue-300'
              : showResult && index === question.correct
              ? 'bg-green-100 text-green-800 border border-green-300'
              : 'bg-white hover:bg-gray-100 border border-gray-200'
          }`}
        >
          {option}
        </button>
      ))}
    </div>
  </div>
);

export default QuizQuestion;
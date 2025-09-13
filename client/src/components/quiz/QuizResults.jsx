import React from 'react';

const QuizResults = ({ questions, selectedAnswers, score, onRetry }) => (
  <div className="text-center">
    <div className="bg-gradient-to-r from-purple-600 to-purple-700 text-white p-8 rounded-2xl mb-6">
      <h3 className="text-2xl font-bold mb-2">Quiz Complete!</h3>
      <div className="text-4xl font-bold mb-2">{score.toFixed(0)}%</div>
      <p className="text-lg opacity-90">
        {score >= 80 ? 'Excellent work!' : score >= 60 ? 'Good job!' : 'Keep studying!'}
      </p>
    </div>
    
    {questions.map((q, index) => (
      <div key={index} className="bg-gray-50 rounded-xl p-4 mb-4 text-left">
        <h5 className="font-semibold mb-2">{q.question}</h5>
        <p className={`mb-2 ${selectedAnswers[index] === q.correct ? 'text-green-600' : 'text-red-600'}`}>
          Your answer: {q.options[selectedAnswers[index]] || 'Not answered'}
        </p>
        {selectedAnswers[index] !== q.correct && (
          <p className="text-green-600 mb-2">Correct answer: {q.options[q.correct]}</p>
        )}
        <p className="text-sm text-gray-600 italic">{q.explanation}</p>
      </div>
    ))}
    
    <button
      onClick={onRetry}
      className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
    >
      Try Again
    </button>
  </div>
);

export default QuizResults;
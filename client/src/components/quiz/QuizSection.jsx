import React, { useState } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';
import { questions } from '../../data/quizQuestions';

const QuizSection = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, index) => {
      if (selectedAnswers[index] === q.correct) correct++;
    });
    return (correct / questions.length) * 100;
  };

  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Test Your Knowledge</h2>
      <div className="max-w-3xl mx-auto">
        {!showResults ? (
          <>
            {questions.map((q, index) => (
              <QuizQuestion
                key={index}
                question={q}
                questionIndex={index}
                selectedAnswer={selectedAnswers[index]}
                onAnswerSelect={handleAnswerSelect}
                showResult={false}
              />
            ))}
            <button
              onClick={() => setShowResults(true)}
              className="w-full mt-6 py-3 bg-green-500 text-white font-semibold rounded-xl hover:bg-green-600 transition-colors"
            >
              Submit Quiz
            </button>
          </>
        ) : (
          <QuizResults 
            questions={questions}
            selectedAnswers={selectedAnswers}
            score={calculateScore()}
            onRetry={() => {
              setSelectedAnswers({});
              setShowResults(false);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default QuizSection;
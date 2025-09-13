import React, { useState, useEffect } from 'react';
import QuizQuestion from './QuizQuestion';
import QuizResults from './QuizResults';

const QuizSection = () => {
  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch AI-generated quiz
  const fetchQuiz = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('http://localhost:5000/api/quiz');
      const data = await res.json();
      if (!data.questions || !Array.isArray(data.questions) || data.questions.length === 0) {
        throw new Error('No questions returned');
      }
      setQuestions(data.questions);
      setSelectedAnswers({});
      setShowResults(false);
    } catch (err) {
      console.error(err);
      setError('Failed to load quiz. Please try again.');
      setQuestions([]); // ensure questions is always an array
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchQuiz();
  }, []);

  const handleAnswerSelect = (questionIndex, answerIndex) => {
    setSelectedAnswers(prev => ({
      ...prev,
      [questionIndex]: answerIndex,
    }));
  };

  const calculateScore = () => {
    let correct = 0;
    questions.forEach((q, idx) => {
      if (selectedAnswers[idx] === q.correct) correct++;
    });
    return (questions.length > 0 ? (correct / questions.length) * 100 : 0);
  };

  if (loading) {
    return <div className="text-center mt-10 text-lg">Generating AI Quiz...</div>;
  }

  if (error) {
    return (
      <div className="text-center mt-10 text-red-600">
        <p>{error}</p>
        <button
          onClick={fetchQuiz}
          className="mt-4 px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold text-center mb-8">AI-Powered Options Trading Quiz</h2>

      {!showResults ? (
        <>
          {questions.length > 0 ? (
            questions.map((q, index) => (
              <QuizQuestion
                key={index}
                question={q}
                questionIndex={index}
                selectedAnswer={selectedAnswers[index]}
                onAnswerSelect={handleAnswerSelect}
                showResult={false}
              />
            ))
          ) : (
            <div className="text-center text-gray-500 mt-4">
              No questions available. Please refresh.
            </div>
          )}

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
          onRetry={fetchQuiz} // retry generates a new AI quiz
        />
      )}
    </div>
  );
};

export default QuizSection;

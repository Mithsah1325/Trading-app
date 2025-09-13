import React, { useState } from "react";

const TaskQuiz = ({ question, options, correctAnswer, onComplete }) => {
  const [selected, setSelected] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    setSubmitted(true);
    const isCorrect = selected === correctAnswer;
    onComplete(isCorrect ? 10 : 0); // award 10 points if correct
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow mb-6">
      <h3 className="text-xl font-bold mb-3">Quiz Task</h3>
      <p className="mb-4">{question}</p>
      <div className="space-y-2">
        {options.map((opt, idx) => (
          <button
            key={idx}
            onClick={() => setSelected(opt)}
            className={`w-full p-2 rounded-lg border ${
              selected === opt ? "bg-blue-200" : "bg-gray-100"
            }`}
            disabled={submitted}
          >
            {opt}
          </button>
        ))}
      </div>
      {!submitted && (
        <button
          onClick={handleSubmit}
          className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg"
        >
          Submit
        </button>
      )}
      {submitted && (
        <p className="mt-3 font-semibold">
          {selected === correctAnswer ? "✅ Correct!" : "❌ Wrong Answer"}
        </p>
      )}
    </div>
  );
};

export default TaskQuiz;

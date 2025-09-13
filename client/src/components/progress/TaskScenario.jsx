import React, { useState } from "react";

const TaskScenario = ({ headline, choices, bestChoice, onComplete }) => {
  const [picked, setPicked] = useState(null);

  const handlePick = (choice) => {
    setPicked(choice);
    onComplete(choice);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow mb-6">
      <h3 className="text-xl font-bold mb-3">Scenario Challenge</h3>
      <p className="mb-4 italic">{headline}</p>
      <div className="flex gap-3 flex-wrap">
        {choices.map((ch, idx) => (
          <button
            key={idx}
            onClick={() => handlePick(ch)}
            disabled={picked !== null}
            className={`px-4 py-2 rounded-lg border ${
              picked === ch ? "bg-green-200" : "bg-gray-100"
            }`}
          >
            {ch}
          </button>
        ))}
      </div>
      {picked && (
        <p className="mt-4 font-semibold">
          {picked === bestChoice
            ? "✅ Correct! Points awarded."
            : "❌ Not optimal. Better luck next time."}
        </p>
      )}
    </div>
  );
};

export default TaskScenario;

import React from "react";

const CompetitionIntro = ({ balance, duration, description }) => {
  return (
    <div className="p-6 rounded-2xl shadow-lg bg-white mb-6">
      <h2 className="text-2xl font-bold mb-2">Trading Challenge</h2>
      <p className="text-gray-700 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <p className="text-lg font-semibold">Starting Balance: ${balance}</p>
        <p className="text-lg">Duration: {duration}</p>
      </div>
    </div>
  );
};

export default CompetitionIntro;

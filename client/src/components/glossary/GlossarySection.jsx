import React from 'react';
import { terms } from '../../data/glossary';

const GlossarySection = () => {
  return (
    <div>
      <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Options Trading Glossary</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {terms.map((item, index) => (
          <div key={index} className="bg-gray-50 p-6 rounded-2xl">
            <div className="flex justify-between items-start mb-3">
              <h4 className="text-lg font-bold text-blue-600">{item.term}</h4>
              <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                item.category === 'Basic' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
              }`}>
                {item.category}
              </span>
            </div>
            <p className="text-gray-700 leading-relaxed">{item.definition}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default GlossarySection;
import React from 'react';

const SimulatorResult = ({ result, selectedStock, optionType, strikePrice }) => (
  <div className={`bg-gradient-to-r ${result.profitable ? 'from-green-500 to-green-600' : 'from-red-500 to-red-600'} text-white p-6 rounded-2xl text-center shadow-lg transition-all duration-300 mb-6`}>
    <div className="text-2xl font-bold mb-4">
      {result.profitable ? 'Profit 💰' : 'Loss ⚠️'}: {result.profitable ? '+' : ''}${result.profitLoss.toFixed(2)}
    </div>
    <div className="text-sm opacity-90">
      <p><strong>Scenario:</strong></p>
      <p>{selectedStock.symbol} moved from ${selectedStock.price} to ${result.newPrice.toFixed(2)}</p>
      <p>Your {optionType} option with strike ${strikePrice} {result.profitable ? 'made money!' : 'expired worthless.'}</p>
      <p className="italic mt-2">{result.hint}</p>
      <p className="mt-2 text-gray-100 text-xs">Tip: Adjust strike and expiration to see how risk/reward changes. ✅</p>
    </div>
  </div>
);

export default SimulatorResult;

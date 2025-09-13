import React from 'react';

const SimulatorControls = ({
  stocks, selectedStock, setSelectedStock,
  optionType, setOptionType,
  strikePrice, setStrikePrice,
  expiration, setExpiration,
  investment, setInvestment,
  onSimulate
}) => (
  <div className="bg-gray-50 rounded-2xl p-6 mb-6 shadow-md">
    <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Practice with Virtual Money 💸</h3>

    <div className="flex flex-wrap justify-center gap-3 mb-6">
      {stocks.map(stock => (
        <button
          key={stock.symbol}
          onClick={() => setSelectedStock(stock)}
          className={`px-4 py-2 rounded-xl transition-all duration-300 ${
            selectedStock.symbol === stock.symbol
              ? 'bg-blue-500 text-white transform scale-110 shadow-lg'
              : 'bg-white text-blue-500 border border-blue-500 hover:bg-blue-50'
          }`}
        >
          {stock.symbol} - ${stock.price}
        </button>
      ))}
    </div>

    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">Option Type</label>
        <select value={optionType} onChange={(e) => setOptionType(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value="call">Call (Bullish 📈)</option>
          <option value="put">Put (Bearish 📉)</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">Strike Price 💵</label>
        <select value={strikePrice} onChange={(e) => setStrikePrice(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value={selectedStock.price - 5}>${selectedStock.price - 5}</option>
          <option value={selectedStock.price}>${selectedStock.price}</option>
          <option value={selectedStock.price + 5}>${selectedStock.price + 5}</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">Days to Expiration ⏳</label>
        <select value={expiration} onChange={(e) => setExpiration(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
          <option value={7}>1 Week</option>
          <option value={30}>1 Month</option>
          <option value={90}>3 Months</option>
        </select>
      </div>

      <div className="bg-white p-4 rounded-xl shadow-sm text-center">
        <label className="block text-sm font-medium text-gray-700 mb-2">Investment 💰</label>
        <input type="number" min="10" max="500" value={investment} onChange={(e) => setInvestment(parseInt(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500" />
      </div>
    </div>

    <button onClick={onSimulate} className="w-full py-4 bg-gradient-to-r from-blue-500 to-blue-600 text-white font-bold rounded-xl hover:from-blue-600 hover:to-blue-700 transition-all duration-300 transform hover:scale-105 shadow-lg">
      Simulate Trade 🚀
    </button>
  </div>
);

export default SimulatorControls;

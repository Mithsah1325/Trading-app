// LessonModal.jsx
import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer, Area } from 'recharts';

const LessonModal = ({ lesson, onClose }) => {
  const [aiContent, setAiContent] = useState('');
  const [chartData, setChartData] = useState([]);

  // Interactive parameters
  const [stockPrice, setStockPrice] = useState(100);
  const [strikePrice, setStrikePrice] = useState(100);
  const [expiryDays, setExpiryDays] = useState(30);

  useEffect(() => {
    setStockPrice(100);
    setStrikePrice(100);
    setExpiryDays(30);
  }, [lesson]);

  const generatePayoffData = () => {
    const data = [];
    for (let price = stockPrice - 20; price <= stockPrice + 20; price += 1) {
      const payoff = Math.max(price - strikePrice, 0);
      data.push({ stockPrice: price, payoff });
    }
    setChartData(data);
  };

  const generateAIContent = () => {
    const explanation = `
${lesson.title} - Interactive Trading Example:
Stock Price: $${stockPrice}, Strike Price: $${strikePrice}, Expiry: ${expiryDays} days.

If the stock moves above $${strikePrice}, your call option gains value.
Adjust the sliders to simulate different market scenarios.`;
    setAiContent(explanation);
  };

  useEffect(() => {
    generatePayoffData();
    generateAIContent();
  }, [stockPrice, strikePrice, expiryDays, lesson]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40 p-4">
      <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white rounded-3xl shadow-2xl overflow-hidden">

        {/* Left panel: sliders and explanation */}
        <div className="md:w-1/3 p-6 flex flex-col justify-between text-black">
          <button
            onClick={onClose}
            className="self-end text-black hover:text-blue-600 font-bold text-xl mb-4"
          >
            ✕
          </button>
          <h3 className="text-2xl font-bold mb-4">{lesson.title}</h3>
          <p className="mb-6 whitespace-pre-line opacity-90">{aiContent}</p>

          <div className="space-y-4">
            {/* Stock Price */}
            <div>
              <label className="block mb-1 font-semibold">Stock Price: ${stockPrice}</label>
              <input
                type="range"
                min="50"
                max="150"
                value={stockPrice}
                onChange={(e) => setStockPrice(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-blue-500"
              />
            </div>

            {/* Strike Price */}
            <div>
              <label className="block mb-1 font-semibold">Strike Price: ${strikePrice}</label>
              <input
                type="range"
                min="50"
                max="150"
                value={strikePrice}
                onChange={(e) => setStrikePrice(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-green-500"
              />
            </div>

            {/* Expiry */}
            <div>
              <label className="block mb-1 font-semibold">Expiry (days): {expiryDays}</label>
              <input
                type="range"
                min="1"
                max="90"
                value={expiryDays}
                onChange={(e) => setExpiryDays(Number(e.target.value))}
                className="w-full h-2 rounded-full accent-red-500"
              />
            </div>
          </div>
        </div>

        {/* Right panel: chart */}
        <div className="md:w-2/3 p-6 flex flex-col items-center justify-center text-black">
          <h4 className="font-semibold mb-4">Payoff Chart</h4>
          <ResponsiveContainer width="100%" height={350}>
            <LineChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="stockPrice" label={{ value: "Stock Price", position: "insideBottomRight", offset: -5 }} />
              <YAxis label={{ value: "Payoff", angle: -90, position: "insideLeft" }} />
              <Tooltip formatter={(value) => `$${value}`} />
              <Line type="monotone" dataKey="payoff" stroke="#2563eb" strokeWidth={3} dot={false} />
              <Area type="monotone" dataKey="payoff" stroke="#2563eb" fill="url(#colorPayoff)" fillOpacity={0.2} />
              <defs>
                <linearGradient id="colorPayoff" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563eb" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#ffffff" stopOpacity={0} />
                </linearGradient>
              </defs>
            </LineChart>
          </ResponsiveContainer>
        </div>

      </div>
    </div>
  );
};

export default LessonModal;

import React, { useState, useEffect } from 'react';
import { io } from 'socket.io-client';   // ✅ import with curly braces
import StockChart from './components/StockChart';
import OptionChain from './components/OptionChain';
import TradeTicket from './components/TradeTicket';
import Leaderboard from './components/Leaderboard';
import NewsFeed from './components/NewsFeed';
import './App.css';

function App() {
  const [currentPrice, setCurrentPrice] = useState(100);
  const [priceHistory, setPriceHistory] = useState([{ time: 0, price: 100 }]);
  const [iv, setIv] = useState(0.5);
  const [news, setNews] = useState([]);
  const [leaderboard, setLeaderboard] = useState([]);
  const [userId] = useState(`user_${Math.random().toString(36).substr(2, 9)}`);

  useEffect(() => {
    // ✅ Create socket inside useEffect
    const socket = io("http://localhost:5000");

    socket.on("initialState", (state) => {
      setCurrentPrice(state.currentPrice);
      setIv(state.impliedVolatility);
    });

    socket.on("priceUpdate", (data) => {
      setCurrentPrice(data.price);
      setPriceHistory((prev) => [...prev, { time: data.time, price: data.price }]);
    });

    socket.on("marketEvent", (event) => {
      setNews((prev) => [event, ...prev.slice(0, 9)]);

      if ("Notification" in window && Notification.permission === "granted") {
        new Notification("Market Event!", {
          body: event.text,
        });
      }
    });

    socket.on("leaderboardUpdate", (data) => {
      setLeaderboard(data);
    });

    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }

    // Cleanup on unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const handlePlaceTrade = (tradeData) => {
    // Create a new socket connection each time isn’t ideal, so use emit inside effect
    const socket = io("http://localhost:5000");
    socket.emit("placeTrade", {
      ...tradeData,
      userId,
      expiry: priceHistory.length + 100,
    });
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>🎭 Meme-Stock Options Arena</h1>
        <div className="price-ticker">
          <span className="ticker-symbol">STONKZ</span>
          <span className="current-price">${currentPrice.toFixed(2)}</span>
          <span className="iv">IV: {(iv * 100).toFixed(0)}%</span>
        </div>
      </header>

      <div className="app-container">
        <div className="left-panel">
          <StockChart data={priceHistory} />
          <NewsFeed news={news} />
        </div>

        <div className="center-panel">
          <OptionChain
            currentPrice={currentPrice}
            iv={iv}
            onPlaceTrade={handlePlaceTrade}
          />
        </div>

        <div className="right-panel">
          <TradeTicket
            currentPrice={currentPrice}
            onPlaceTrade={handlePlaceTrade}
          />
          <Leaderboard data={leaderboard} />
        </div>
      </div>
    </div>
  );
}

export default App;

import React from "react";

const Leaderboard = ({ scores }) => {
  return (
    <div className="p-6 bg-white rounded-2xl shadow mt-6">
      <h3 className="text-xl font-bold mb-4">🏆 Leaderboard</h3>
      <ul>
        {scores
          .sort((a, b) => b.points - a.points)
          .map((user, idx) => (
            <li
              key={user.name}
              className="flex justify-between p-2 border-b last:border-none"
            >
              <span>
                {idx + 1}. {user.name}
              </span>
              <span className="font-semibold">{user.points} pts</span>
            </li>
          ))}
      </ul>
    </div>
  );
};

export default Leaderboard;

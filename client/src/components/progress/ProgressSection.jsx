import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskScenario from "./TaskScenario";
import Leaderboard from "./Leaderboard";
import weeks from "../../data/weeks";

const ProgressSection = ({ user, setUser }) => {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loadingLeaderboard, setLoadingLeaderboard] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoadingLeaderboard(true);
      const res = await axios.get("http://localhost:5000/api/leaderboard");
      setLeaderboard(res.data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoadingLeaderboard(false);
    }
  };

  const handleComplete = async (task, choice) => {
    try {
      const isCorrect = choice === task.bestChoice;
      const token = localStorage.getItem("token");

      const res = await axios.post(
        "http://localhost:5000/api/progress",
        { week: task.week, taskId: task.id, choice, correct: isCorrect },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setUser(res.data);
      fetchLeaderboard();
    } catch (err) {
      console.error(err);
    }
  };

  const handleCongrats = async () => {
    try {
      const token = localStorage.getItem("token");
      const res = await axios.post(
        "http://localhost:5000/api/congrats",
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      alert(res.data.message);
    } catch (err) {
      console.error(err);
      alert("Failed to send congratulations email.");
    }
  };

  if (!user) return <p>Loading user...</p>;

  const currentWeek = user.currentWeek;
  const weekData = weeks.find((w) => w.week === currentWeek);
  const nextTask = weekData?.tasks?.find(
    (t) => !user.history.some(h => h.taskId === t.id && h.week === currentWeek)
  );

  return (
    <div className="max-w-3xl mx-auto">
      {weekData ? (
        <>
          <h2 className="text-2xl font-bold mb-4">Trading Challenge - Week {currentWeek}</h2>
          <p className="mb-4">Balance: ${user.balance}</p>

          {nextTask ? (
            <TaskScenario
              headline={nextTask.headline}
              choices={nextTask.choices}
              bestChoice={nextTask.bestChoice}
              onComplete={(choice) => handleComplete({ ...nextTask, week: currentWeek }, choice)}
            />
          ) : currentWeek < weeks.length ? (
            <p className="text-lg font-bold">All tasks for Week {currentWeek} completed!</p>
          ) : (
            <div>
              <p className="text-xl font-bold mb-4">🎉 Challenge Completed!</p>
              <button
                onClick={handleCongrats}
                className="px-4 py-2 rounded-lg bg-green-500 text-white"
              >
                Send Congratulations Email
              </button>
            </div>
          )}
        </>
      ) : (
        <p className="text-xl font-bold">🎉 You completed all weeks!</p>
      )}

      {loadingLeaderboard ? (
        <p>Loading leaderboard...</p>
      ) : (
        <Leaderboard
          scores={leaderboard.map((u) => ({ name: u.name, points: u.balance }))}
        />
      )}
    </div>
  );
};

export default ProgressSection;

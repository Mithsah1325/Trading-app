import React, { useEffect, useState } from "react";
import axios from "axios";
import TaskScenario from "./TaskScenario";
import tasks from "../../data/tasks";
import Leaderboard from "./Leaderboard";

const ProgressSection = ({ user, setUser }) => {
  const [leaderboard, setLeaderboard] = useState([]);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    const res = await axios.get("http://localhost:5000/api/leaderboard");
    setLeaderboard(res.data);
  };

  const handleComplete = async (task, choice) => {
    const profitLoss = task.profitLoss[choice];
    const token = localStorage.getItem("token");

    const res = await axios.post(
      "http://localhost:5000/api/progress",
      { taskId: task.id, choice, profitLoss },
      { headers: { Authorization: `Bearer ${token}` } }
    );
    setUser(res.data);
    fetchLeaderboard();
  };

  if (!user) return <p>Loading...</p>;

  const currentTask = tasks.find((t) => t.id === user.currentTask + 1);

  return (
    <div className="max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Trading Challenge</h2>
      <p className="mb-4">Balance: ${user.balance}</p>

      {currentTask ? (
        <TaskScenario task={currentTask} onPick={(choice) => handleComplete(currentTask, choice)} />
      ) : (
        <p className="text-xl font-bold">🏁 Challenge complete!</p>
      )}

      <Leaderboard scores={leaderboard.map((u) => ({ name: u.name, points: u.balance }))} />
    </div>
  );
};

export default ProgressSection;

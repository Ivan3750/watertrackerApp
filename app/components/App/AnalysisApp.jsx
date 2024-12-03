import "@/app/styles/analysis.css";
import { useState, useEffect } from "react";

const AnalysisApp = ({ userdata }) => {
  const [weeklyAverage, setWeeklyAverage] = useState(0);
  const [monthlyAverage, setMonthlyAverage] = useState(0);
  const [drinkFrequency, setDrinkFrequency] = useState(0);
  const [averageCompletion, setAverageCompletion] = useState(0);
  const [weeklyData, setWeeklyData] = useState([]);
  const [totalWater, setTotalWater] = useState(0);
  const [maxWater, setMaxWater] = useState(0);

  useEffect(() => {
    if (!userdata || !userdata.waterTracker || !userdata.goal) {
      console.error("Missing userdata or required fields.");
      return;
    }

    const { waterTracker, goal, time } = userdata;

    const now = new Date();
    const startOfWeek = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate() - now.getDay()
    );
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);

    const weeklyTempData = Array(7).fill(0);
    let weeklyTotal = 0;
    let monthlyTotal = 0;
    let weeklyDrinks = 0;
    let monthlyDrinks = 0;

    waterTracker.forEach(({ amount, date }) => {
      const drinkDate = new Date(date);

      if (drinkDate >= startOfWeek) {
        const dayIndex = drinkDate.getDay();
        weeklyTempData[dayIndex] += amount;
        weeklyTotal += amount;
        weeklyDrinks++;
      }

      if (drinkDate >= startOfMonth) {
        monthlyTotal += amount;
        monthlyDrinks++;
      }
    });

    const wakeUp = new Date(time.wakeUp);
    const sleepTime = new Date(time.sleepTime);
    const activeHours = (sleepTime - wakeUp) / (1000 * 60 * 60);

    setWeeklyData(weeklyTempData);
    setTotalWater(weeklyTotal);
    setMaxWater(Math.max(goal, ...weeklyTempData));
    setWeeklyAverage((weeklyTotal / 7).toFixed(1));
    setMonthlyAverage((monthlyTotal / 30).toFixed(1));
    setDrinkFrequency((weeklyDrinks / 7).toFixed(1));
    setAverageCompletion(
      weeklyTotal > 0 ? ((weeklyTotal / (goal * 7)) * 100).toFixed(1) : 0
    );
  }, [userdata]);

  return (
    <>
      <div className="header">
        <h2>Analysis</h2>
      </div>
      <div className="chart-container">
        <h2>Water of week</h2>
        <div className="chart">
          {weeklyData.map((amount, index) => (
            <div
              key={index}
              className="bar"
              style={{
                height: `${(amount / maxWater) * 100}%`,
              }}
            />
          ))}
        </div>
        <div className="liters">{(totalWater / 1000).toFixed(1)} liters</div>
      </div>
      <div className="stats">
        <div className="stat-item">
          <p>Weekly Average</p>
          <h3>{weeklyAverage}ml/day</h3>
        </div>
        <div className="stat-item">
          <p>Monthly Average</p>
          <h3>{monthlyAverage}ml/day</h3>
        </div>
        <div className="stat-item">
          <p>Drink Frequency</p>
          <h3>{drinkFrequency} times/day</h3>
        </div>
        <div className="stat-item">
          <p>Average Completion</p>
          <h3>{averageCompletion}%</h3>
        </div>
      </div>
    </>
  );
};

export default AnalysisApp;

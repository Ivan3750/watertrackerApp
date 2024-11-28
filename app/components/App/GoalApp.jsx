"use client";
import { useState } from "react";

import "@/app/styles/goal.css";
import GoalCard from "@/app/components/GoalCard";

const GoalApp = ({ userdata }) => {
  const [searchValue, setSearchValue] = useState("");
  const [goalAmount, setGoalAmount] = useState(userdata.goal);

  const token = localStorage.getItem("token"); // Отримання токена користувача
  const url = "/api/profil"; // URL для оновлення даних користувача

  // Функція для оновлення goal на сервері
  const updateGoalOnServer = async (newGoal) => {
    try {
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ goal: newGoal }),
      });

      if (response.ok) {
        const result = await response.json();
        console.log("Goal updated successfully:", result);
      } else {
        const error = await response.json();
        console.error("Error updating goal:", error.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Обробник зміни мети
  const handleGoalChange = (newGoal) => {
    setGoalAmount(newGoal);
    updateGoalOnServer(newGoal);
  };

  const goalCards = [
    { title: "Summer time 🌴", amount: 2000 },
    { title: "Hydration boost 💧", amount: 2500 },
    { title: "Fitness goal 🏋️‍♂️", amount: 3000 },
    { title: "Morning fresh 🌅", amount: 1500 },
    { title: "Power-up hydration ⚡", amount: 1800 },
    { title: "Healthy skin glow ✨", amount: 2200 },
    { title: "Post-workout refill 💪", amount: 2800 },
    { title: "Focus and energy 🔋", amount: 2300 },
    { title: "Detox cleanse 🍋", amount: 2700 },
    { title: "Afternoon refreshment 🌞", amount: 2100 },
    { title: "Rise and shine ☀️", amount: 1600 },
    { title: "Weekend hydration 🏖️", amount: 3200 },
    { title: "Mental clarity 💡", amount: 1900 },
    { title: "Mood booster 😊", amount: 2400 },
    { title: "Thirsty Thursday 🥤", amount: 2600 },
    { title: "Healthy habits 💚", amount: 2000 },
    { title: "Quick refresh 🚰", amount: 1500 },
    { title: "Energize your day ⚡", amount: 3000 },
    { title: "Weekend getaway 🌊", amount: 3300 },
    { title: "Mindful hydration 🧘‍♀️", amount: 2100 },
  ];

  const filteredCards = goalCards.filter((card) =>
    card.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <>
      <div className="header">
        <h2 className="header-text">Set Your Goal</h2>
        <div className="goal-display">
          <input
            type="number"
            className="input-setGoal"
            min="100"
            max="5000"
            step="50"
            value={goalAmount}
            onChange={(e) => handleGoalChange(Number(e.target.value))}
          />
          <span>ml</span>
        </div>
      </div>
      <div className="goal-section">
        <h3 className="section-title">Water Goal</h3>
        <p className="description">We prepared a lot of goals for you</p>
        <input
          type="text"
          placeholder="Search Template"
          className="search-input"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
        />
        <div className="cards-container">
          {filteredCards.map((card, index) => (
            <GoalCard
              key={index}
              title={card.title}
              amount={card.amount}
              onClick={() => handleGoalChange(card.amount)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

export default GoalApp;

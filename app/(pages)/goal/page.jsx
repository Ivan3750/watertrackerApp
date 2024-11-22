"use client";

import "@/app/styles/goal.css";
import GoalCard from "@/app/components/GoalCard";
import search from "@/app/assets/search.svg";
import { useState, useEffect } from "react";

const WaterGoal = () => {
  const [searchValue, setSearchValue] = useState("");
  const [goalAmount, setGoalAmount] = useState(2000);

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
  
  useEffect(()=>{
    fetch('/api/profil', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.token}`
      }
  })
      .then(response => response.json())
      .then(data => {
        setGoalAmount(Number(data.goal))
      })
      .catch(error => console.error(error));
  
  }
    ,[])


  useEffect(()=>{

  },[goalAmount])


  const filteredCards = goalCards.filter((card) =>
    card.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
    <div className="container">
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
            onChange={(e) => setGoalAmount(Number(e.target.value))}
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
              onClick={() => setGoalAmount(card.amount)}  
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default WaterGoal;

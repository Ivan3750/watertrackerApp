"use client";
import { Suspense } from 'react'

import "@/app/styles/goal.css";
import GoalCard from "@/app/components/GoalCard";
import search from "@/app/assets/search.svg";
import { useState, useEffect } from "react";

const AddApp = () => {
  const [searchValue, setSearchValue] = useState(""); 
  const [amount, setAmount] = useState(200);

  const amountCards = 
    [
      { title: "Glass of Water", amount: 200 },
      { title: "Small Bottle of Water", amount: 500 },
      { title: "Large Bottle of Water", amount: 1000 },
      { title: "Cup of Water", amount: 250 },
      { title: "Jug of Water", amount: 1500 },
      { title: "Can of Water", amount: 330 },
      { title: "Sports Bottle of Water", amount: 750 },
      { title: "Tiny Glass of Water", amount: 150 },
      { title: "Mug of Water", amount: 300 },
      { title: "Thermos of Water", amount: 1000 },
      { title: "Shot of Water", amount: 50 },
      { title: "Pitcher of Water", amount: 2000 }
  ]
  
  
  
  useEffect(()=>{
    fetch('/api/profil', {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${localStorage.token}`
      }
  })
      .then(response => response.json())
      .then(data => {
        setAmount(Number(data.goal))
      })
      .catch(error => console.error(error));
  
  }
    ,[])  // Додати своє завантаження


  useEffect(()=>{
      
  },[amount])


  const filteredCards = amountCards.filter((card) =>
    card.title.toLowerCase().includes(searchValue.toLowerCase())
  );

  return (
<>
      <div className="header">
        <h2 className="header-text">Water Amount</h2>
        <div className="goal-display">
          <input
            type="number"
            className="input-setGoal"
            min="100"
            max="5000"
            step="50"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            />
          <span>ml</span>
        </div>
      </div>
      <div className="goal-section">
        <h3 className="section-title">Water</h3>
        <p className="description">We prepared a lot of amounts for you</p>
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
            onClick={() => setAmount(card.amount)}  
            />
        ))}
        </div>
      </div>
        </>
 );
};

export default AddApp;  

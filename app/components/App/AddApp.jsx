"use client";
import { useState, useEffect, useMemo } from "react";
import "@/app/styles/goal.css";
import GoalCard from "@/app/components/GoalCard";
import GetUserData from "@/app/lib/GET"

const AddApp = ({userdata}) => {
  const [searchValue, setSearchValue] = useState("");
  const [amount, setAmount] = useState(200);
  const token = localStorage.getItem("token");
  const url = "/api/profil";

  const amountCards = [
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
    { title: "Pitcher of Water", amount: 2000 },
  ];

  // Fetch user profile data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) setAmount(Number(data.goal) || 200);
        else console.error("Error fetching profile:", data.message);
      } catch (error) {
        console.error("Fetch failed:", error);
      }
    };
    fetchData();
  }, [url, token]);

  // Update user data
  const FuncUpdateUserData = async () => {
    try {
      const newUserData = await GetUserData()
      console.log("data: " + newUserData)
      const response = await fetch(url, {
        method: "PATCH",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          waterTracker: [...newUserData.waterTracker, 
            { amount: amount, date: new Date().toISOString() },
          ],
        }),
        
      });
      if (response.ok) {
        const result = await response.json();
        console.log("Update successful:", result);
      } else {
        const error = await response.json();
        console.error("Error:", error.message);
      }
    } catch (error) {
      console.error("Request failed:", error);
    }
  };

  // Memoize filtered cards for better performance
  const filteredCards = useMemo(
    () =>
      amountCards.filter((card) =>
        card.title.toLowerCase().includes(searchValue.toLowerCase())
      ),
    [searchValue]
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
        <button
          className="update-button"
          onClick={() =>
            FuncUpdateUserData()
          }
        >
          Add to Tracker
        </button>
      </div>
    </>
  );
};

export default AddApp;

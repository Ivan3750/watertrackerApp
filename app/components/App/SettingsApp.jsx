"use client";

import "@/app/styles/settings.css";
import { useEffect, useState } from "react";


function formatToInputTime(dateString) {
  const date = new Date(dateString);
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0'); 
  return `${hours }:${minutes}`;
}

const SettingsApp = ({ userdata }) => {
  console.log(userdata);
  const [weight, setWeight] = useState(userdata.weight);
  const [height, setHeight] = useState(userdata.height);
  const [wakeUp, setWakeUp] = useState(formatToInputTime(userdata.time.wakeUp) || "07:00");
  const [sleepTime, setSleepTime] = useState(formatToInputTime(userdata.time.sleepTime) || "22:00");
  function setDefaultTime(time) {
    let changeTime = time.split(":") 
    const [hours, minutes] = changeTime
    const date = new Date();
    date.setHours(hours, minutes, 0, 0); // Установка часу
    return date;
  }
  useEffect(() => {
    console.log(weight, height, wakeUp, sleepTime)
    const updateProfile = async () => {
      const token = localStorage.getItem("token");
      const url = "/api/profil";

      try {
        const response = await fetch(url, {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            weight,
            height,
            time: { wakeUp: setDefaultTime(wakeUp), sleepTime: setDefaultTime(sleepTime) },
          }),
        });

        if (response.ok) {
          const result = await response.json();
          console.log("Data updated successfully:", result);
        } else {
          const error = await response.json();
          console.error("Error updating data:", error.message);
        }
      } catch (error) {
        console.error("Request failed:", error);
      }
    };

    updateProfile();
  }, [weight, height, wakeUp, sleepTime]);

  return (
    <div className="settings">
      <p className="settings-title">Settings</p>

      {/* Weight Input */}
      <div className="rangeBox">
        <label htmlFor="inputWeight">What is your weight (in kg)</label>
        <input
          id="inputWeight"
          type="range"
          className="inputWeight"
          min={0}
          max={200}
          value={weight}
          onChange={(e) => setWeight(Number(e.target.value))}
        />
        <div className="range-info">
          <p>{weight} kg</p>
        </div>
      </div>

      {/* Height Input */}
      <div className="rangeBox">
        <label htmlFor="inputHeight">What is your height (in cm)</label>
        <input
          id="inputHeight"
          type="range"
          className="inputHeight"
          min={0}
          max={200}
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
        <div className="range-info">
          <p>{height} cm</p>
        </div>
      </div>

      {/* Wake Up Time Input */}
      <div>
        <p>Wake up time</p>
        <div className="time-input">
          <input
            type="time"
            value={wakeUp}
            onChange={(e) => setWakeUp(e.target.value)}
          />
        </div>
      </div>

      {/* Sleeping Time Input */}
      <div>
        <p>Sleeping time</p>
        <div className="time-input">
          <input
            type="time"
            value={sleepTime}
            onChange={(e) => setSleepTime(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default SettingsApp;

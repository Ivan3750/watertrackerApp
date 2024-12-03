import "@/app/styles/home.css"
import WaterDrop from "@/app/assets/water drop.svg"
import Image from "next/image"
import { useState, useEffect } from "react";




const HomeApp = ({linkFunc, userdata}) => {    
  const [lastDrinkTime, setLastDrinkTime] = useState("");
  const [amountOfWater, setAmountOfWater] = useState(0);

  useEffect(() => {
    if (userdata?.waterTracker?.length > 0) {
      const lastEntry = userdata.waterTracker[userdata.waterTracker.length - 1];
      const drinkTime = new Date(lastEntry.date);
      const formattedTime = `${drinkTime.getHours()}:${drinkTime.getMinutes()} ${drinkTime.getHours() >= 12 ? "PM" : "AM"}`;

      setLastDrinkTime(formattedTime);
      setAmountOfWater(lastEntry.amount);
    }
  }, [userdata]);

  let amount = 0
  const calcPosition = () =>{
      amount = userdata.waterTracker.reduce((acc, el)=>{
        return acc + el.amount 
      }, 0)
      let position = 100-(amount/userdata.goal) * 140
      console.log(position, amount , userdata.goal)
      if(position < -40){
        position = -40
      }else if(position > 100){
        position = 100
      }
      return position
    }

    return (
        <>
        <header className="header">
          <p>Good Morning,</p>
          <h2>{userdata.username}</h2>
        </header>
        <section className="reminder">
      <div className="reminder-content">
        <p className="last-time">{lastDrinkTime || "No data"}</p>
        <p className="amount-water">{amountOfWater}ml water</p>
        <button onClick={() => { linkFunc("goal") }} className="goal-button">Add Your Goal</button>
      </div>
      <div className="water-drop">
        <Image src={WaterDrop} alt="Water Drop" />
      </div>
    </section>

        <section className="chart-section" >
          <div className="chart-circle" style={{ backgroundPositionY: `${calcPosition()}px`}}>
            <p className="water-amount">{amount}ml</p>
          </div>
          <div className="progress">
            <div className="target">
              <p className="target-title">Target</p>
              <p className="target-amount">
                {userdata.goal}
                ml</p>
            </div>
          </div>
        </section>
        </>
        
    );
  };
  
  export default HomeApp; 
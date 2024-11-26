import "@/app/styles/home.css"
import FooterApp from "@/app/components/App/FooterApp"
import WaterDrop from "@/app/assets/water drop.svg"
import Image from "next/image"




const HomeApp = () => {    
    return (
        <>
        <header className="header">
          <p>Good Morning,</p>
          <h2>Aashifa Sheikh</h2>
        </header>
  
        <section className="reminder">
          <div className="reminder-content">
            <p className="last-time">11:00 AM</p>
            <p className="amount-water">200ml water (2 Glass)</p>
            <a href="/goal" className="goal-button">Add Your Goal</a>
          </div>
          <div className="water-drop">
            <Image src={WaterDrop} alt="Water Drop" />
          </div>
        </section>
  
        <section className="chart-section">
          <div className="chart">
            <p className="water-amount">500ml</p>
          </div>
          <div className="progress">
            <div className="target">
              <p className="target-title">Target</p>
              <p classname="target-amount">2000ml</p>
            </div>
          </div>
        </section>
        </>
        
    );
  };
  
  export default HomeApp;
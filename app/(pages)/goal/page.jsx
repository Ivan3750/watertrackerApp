import "@/app/styles/goal.css"


const WaterGoal = () => {
    return (
      <div className="container">
        <div className="header">
          <h2 className="header-text">Set Your Goal</h2>
          <div className="goal-display">2000ml</div>
        </div>
        <div className="goal-section">
          <h3 className="section-title">Water Goal</h3>
          <p className="description">We prepared a lot of goals for you</p>
  
          <input
            type="text"
            placeholder="Search Template"
            className="search-input"
          />
          <div className="cards-container">
            <div className="card">            <span>Summer time</span>
            <span role="img" aria-label="palm tree">🌴</span>
            <span className="card-value">2000ml</span>
          </div>
          <div className="card">
            <span>Sporty</span>
            <span role="img" aria-label="basketball">🏀</span>
            <span className="card-value">1400ml</span>
          </div>
          <div className="card">
            <span>Snow day</span>
            <span role="img" aria-label="snowflake">❄️</span>
            <span className="card-value">1200ml</span>
          </div>
          <div className="card">
            <span>Child</span>
            <span role="img" aria-label="rainbow">🌈</span>
            <span className="card-value">1000ml</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WaterGoal;

 

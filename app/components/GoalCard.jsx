const GoalCard = ({ title, amount, onClick }) => {
    return (
      <div className="card" onClick={onClick}> 
        <h3>{title}</h3>
        <span className="card-value">{amount} ml</span>
      </div>
    );
  };
  
  export default GoalCard;
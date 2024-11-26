import "@/app/styles/analysis.css"
import FooterApp from "@/app/components/App/FooterApp"

const AnalysisApp = () => {


    /* useEffect(()=>{
        fetch('/api/profil', {
          method: 'GET',
          headers: {
              'Authorization': `Bearer ${localStorage.token}`
          }
      })
          .then(response => response.json())
          .then(data => {
            console.log(data)
          })
          .catch(error => console.error(error));
      
      }
        ,[]) */

    return ( <>
    <div className="header">
      <h2>Analysis</h2>
    </div>
      <div className="chart-container">
        <h2>Water of week</h2>
        <div className="chart">
          <div className="bar" ></div>
          <div className="bar" ></div>
          <div className="bar" ></div>
          <div className="bar" ></div>
          <div className="bar highlighted" ></div>
          <div className="bar" ></div>
          <div className="bar" ></div>
        </div>
        <div className="liters">2.1 liters</div>
      </div>
      <div className="stats">
        <div className="stat-item">
          <p>Weekly Average</p>
          <h3>0ml/day</h3>
        </div>
        <div className="stat-item">
          <p>Monthly Average</p>
          <h3>0ml/day</h3>
        </div>
        <div className="stat-item">
          <p>Drink Frequency</p>
          <h3>0 times/day</h3>
        </div>
        <div className="stat-item">
          <p>Average Completion</p>
          <h3>0%</h3>
        </div>
      </div>
    
  
    </> );
}
 
export default AnalysisApp;
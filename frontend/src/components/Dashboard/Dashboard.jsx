import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Reports from "./Reports";
import RecentDetections from "./RecentDetections";
import RecentActivity from "./RecentActivity";
import BudgetReport from "./BudgetReport";

const Dashboard = () => {
  const [cards, setCards] = useState([]); // State to hold detection data

  // Fetch detection data from the backend
  const fetchData = async () => {
    fetch("https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data")
    .then(res => res.json())
    .then(data => {
        setCards(data);
    })
    .catch(e => console.log(e.message));
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">
            {/* <div className="col-12">
              {cards &&
                cards.length > 0 &&
                cards.map(card => <Card key={card.detection} card={card} />)
              }
            </div> */}
            <div className="col-12">
              <Reports />
            </div>

            <div className="col-12">
              <RecentDetections />
            </div>
              
          </div>
        </div>

        <div className="col-lg-4">
          <RecentActivity />
          <BudgetReport />
        </div>

      </div>
    </section>
  );
};

export default Dashboard;

import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Reports from "./Reports";
import RecentDetections from "./RecentDetections";
import RecentActivity from "./RecentActivity";
import BudgetReport from "./BudgetReport";

const Dashboard = () => {
  const [data, setData] = useState([]); // Unified data state
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all data in one request
  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          "https://elephant-detection-website-production.onrender.com/api/detection/get-detection-data?limit=500" // Added limit
        );
        if (!response.ok) throw new Error('Network response was not ok');
        const result = await response.json();
        setData(result.data || result); // Handles both paginated and non-paginated responses
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <section className="dashboard section">
      {loading && <div className="loading-spinner">Loading...</div>}
      {error && <div className="error-message">{error}</div>}
      
      {!loading && !error && (
        <div className="row">
          <div className="col-lg-8">
            <div className="row">
              <div className="col-12">
                <Reports /> 
              </div>
              <div className="col-12">
                <RecentDetections initialData={data} /> {/* Pass full data */}
              </div>
            </div>
          </div>
          <div className="col-lg-4">
            <RecentActivity initialData={data} /> {/* Pass full data */}
            <BudgetReport />
          </div>
        </div>
      )}
    </section>
  );
};

export default Dashboard;
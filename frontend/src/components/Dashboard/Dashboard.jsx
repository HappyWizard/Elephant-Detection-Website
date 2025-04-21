import React, { useState, useEffect } from "react";
import "./dashboard.css";
import Reports from "./Reports";
import RecentDetections from "./RecentDetections";
import RecentActivity from "./RecentActivity";
import BudgetReport from "./BudgetReport";

const Dashboard = () => {

  return (
    <section className="dashboard section">
      <div className="row">
        <div className="col-lg-8">
          <div className="row">

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

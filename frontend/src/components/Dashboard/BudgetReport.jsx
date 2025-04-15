import React, { useState, useEffect } from "react";
import "./recentDetections.css";
import CardFilter from "./CardFilter";
import BudgetChart from "./BudgetChart";

function BudgetReport() {
  const [items, setItems] = useState([]);
  const [filter, setFilter] = useState("Today");
  const handleFilterChange = (filter) => {
    setFilter(filter);
  };
  return (
    <div className="card">
    <CardFilter filterChange={handleFilterChange} />

    <div className="card-body pb-0">
      <h5 className="card-title">
        Teamwork Report <span>/{filter}</span>
      </h5>
      <BudgetChart items={items} />
    </div>
  </div>
  )
}

export default BudgetReport;

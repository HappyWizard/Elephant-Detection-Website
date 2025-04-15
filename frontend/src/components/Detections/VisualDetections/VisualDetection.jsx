import React from 'react'
import '../../Dashboard/dashboard.css'
import TestDisplay from '../../Dashboard/testDisplay'
import DonutChart from './DonutChart'

const VisualDetection = () => {
  return (
    <section className="dashboard section">
      <div className="row gap-4"> {/* Adds space between columns */}
        <div className="col-lg-7">
          <div className="row">
            <TestDisplay />
          </div>
        </div>

        <div className="col-lg-4">
          <div className="row">
            <DonutChart />
          </div>
        </div>
      </div>
    </section>
  );
};


export default VisualDetection
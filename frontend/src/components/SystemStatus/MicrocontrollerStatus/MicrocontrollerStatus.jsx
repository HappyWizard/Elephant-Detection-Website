import React from 'react'
import '../../Dashboard/dashboard.css'
import SystemStatusCharts from './SystemStatusCharts'

const MicrocontrollerStatus = () => {

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-12">
                      <SystemStatusCharts />
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
    </section>

  )
}

export default MicrocontrollerStatus
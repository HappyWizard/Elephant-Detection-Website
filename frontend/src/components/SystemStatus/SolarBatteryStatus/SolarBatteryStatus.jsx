import React from 'react'
import '../../Dashboard/dashboard.css'
import SolarBatteryStatusDisplay from './SolarBatteryStatusDisplay'
import SolarBatteryStatusChart from './SolarBatteryStatusChart'

const SolarBatteryStatus = () => {

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-5">
                      <SolarBatteryStatusDisplay />
                    </div>
                    <div className="col-7">
                      <SolarBatteryStatusChart />
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
    </section>

  )
}

export default SolarBatteryStatus
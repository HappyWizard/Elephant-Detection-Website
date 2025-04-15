import React from 'react'
import '../../Dashboard/dashboard.css'
import Report from './Report'


const DetectionReport = () => {

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-11">
                <div className="row">
                    <div className="col-12">
                      <Report />
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
    </section>

  )
}

export default DetectionReport
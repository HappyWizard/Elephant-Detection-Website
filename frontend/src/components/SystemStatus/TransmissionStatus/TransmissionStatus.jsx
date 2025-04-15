import React from 'react'
import '../../Dashboard/dashboard.css'
import TransmissionStatusGraph from './TransmissionStatusGraph'

const TransmissionStatus = () => {

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-12">
                      <TransmissionStatusGraph />
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
    </section>

  )
}

export default TransmissionStatus
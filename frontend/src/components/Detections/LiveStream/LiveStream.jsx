import React from 'react'
import '../../Dashboard/dashboard.css'
import ObjectDetectionUI from './ObjectDetectionUI'


const LiveStream = () => {

  return (
    <section className="dashboard section">
        <div className="row">
            <div className="col-lg-11">
                <div className="row">
                    <div className="col-12">
                      <ObjectDetectionUI />
                    </div>
                </div>
            </div>
            <div className="col-lg-1"></div>
        </div>
    </section>

  )
}

export default LiveStream
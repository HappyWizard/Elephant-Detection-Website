import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import DetectionReport from './DetectionReport'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Detection Report'/>
        <DetectionReport />
        
    </main>
  )
}

export default Main
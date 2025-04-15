import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import SolarBatteryStatus from './SolarBatteryStatus'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Solar Battery Status'/>
        <SolarBatteryStatus />
        
    </main>
  )
}

export default Main
import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import SolarSimulationGraph from './SolarSimulationGraph'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Solar Energy Simulation'/>
        <SolarSimulationGraph />
        
    </main>
  )
}

export default Main
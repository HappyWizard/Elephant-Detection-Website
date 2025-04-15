import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import MicrocontrollerStatus from './MicrocontrollerStatus'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Microcontroller Status'/>
        <MicrocontrollerStatus />
        
    </main>
  )
}

export default Main
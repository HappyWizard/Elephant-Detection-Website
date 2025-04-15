import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import TransmissionStatus from './TransmissionStatus'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Data Transmission Status'/>
        <TransmissionStatus />
        
    </main>
  )
}

export default Main
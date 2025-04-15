import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import WildlifeLocation from './WildlifeLocation'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Wildlife Location Density'/>
        <WildlifeLocation />
    </main>
  )
}

export default Main
import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import LiveStream from './LiveStream'
import StartButton from './StartButton'


const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Live Stream'/>
        <LiveStream />
    </main>
  )
}

export default Main
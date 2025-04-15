import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import AudioDetection from './AudioDetection'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Audio Detections'/>
        <AudioDetection />
    </main>
  )
}

export default Main
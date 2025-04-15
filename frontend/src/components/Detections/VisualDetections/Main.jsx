import React from 'react'
import '../../Dashboard/main.css'
import PageTitle from '../../Dashboard/PageTitle'
import VisualDetection from './VisualDetection'

const Main = () => {
  return (
    <main id="main" className="main">
        <PageTitle page='Visual Detections'/>
        <VisualDetection />
    </main>
  )
}

export default Main
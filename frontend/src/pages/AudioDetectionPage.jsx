import React from 'react'
// import Icons
import 'bootstrap-icons/font/bootstrap-icons.css';
import 'remixicon/fonts/remixicon.css';
// To enable the bootstrap css
// To enable the bootstrap js
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min.js'

import Header from '../components/Dashboard/Header'
import '../App.css'
import SideBar from '../components/Dashboard/SideBar';
import Main from '../components/Detections/AudioDetections/Main';


const AudioDetectionPage = () => {
  return (
    <>
      <Header />
      <SideBar />
      <Main />
    </>
  )
}

export default AudioDetectionPage
import React from 'react'
import './logo.css'
import logo from '../../assets/app-icon.png'
import logo2 from '../../assets/raspberry.png'

const Logo = () => {
    const handleToggleSideBar = () => {
        document.body.classList.toggle('toggle-sidebar')
    }
  return (
    <div className="d-flex align-items-center justify-content-between">
        <a href="/" className="logo d-flex align-items-center">
            <img src={logo2} alt="logo" />

            <span className='d-none d-lg-block'>Elephant Haven</span>

        </a>
        <i className='bi bi-list toggle-sidebar-btn' onClick={handleToggleSideBar}>
            
        </i>
    </div>
  )
}

export default Logo
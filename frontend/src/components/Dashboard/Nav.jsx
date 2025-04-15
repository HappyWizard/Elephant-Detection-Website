import React from 'react'
import './nav.css'
import NavLogout from './NavLogout'
import NavMessage from './NavMessage'
import NavNotice from './NavNotice'

const Nav = () => {
  return (
    <nav className="header-nav ms-auto">
        <ul className="d-flex align-items-center">
            <NavNotice/>
            <NavMessage/>
            <NavLogout/>
        </ul>

    </nav>
  )
}

export default Nav
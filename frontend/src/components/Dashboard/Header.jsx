import './header.css'
import React from 'react'
import Logo from './Logo.jsx'
import SearchBar from './SearchBar.jsx'
import Nav from './Nav.jsx'
const Header = () => {

  return (
    <header id='header' className='header fixed-top d-flex align-items-center'>
      {/* {logo} */}
      <Logo/>
      {/* {search bar} */}
      <SearchBar/>
      {/* {nav} */}
      <Nav/>
      
    </header>
  )
}

export default Header
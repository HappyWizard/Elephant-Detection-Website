import React from 'react'

const NavAvatar = () => {

  const logout = () => {
    // window.localStorage.clear() // clear all values in local storage, if u want the remember feature then cannot clear everything
    window.localStorage.removeItem("token"); // Remove only the token
    window.localStorage.removeItem("tokenExpiration"); // Remove the token expiration
    window.location.href = "./login"
  }

  return (
    <a className="nav-link nav-icon d-flex justify-content-evenly align-items-center" onClick={logout}>
      <i className="bi bi-box-arrow-right"></i>
      <span className="fs-6 ms-2">Logout</span> {/* Adds margin to the left of the span */}
    </a>
  )
}

export default NavAvatar
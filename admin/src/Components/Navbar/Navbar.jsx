import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/logo.png'
import navProfile from '../../assets/admin_image.png'

const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} className='nav-logo' alt="" />
        {/* <p>Shopper</p> */}
        <img src={navProfile} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar
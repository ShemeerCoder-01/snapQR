import React from 'react'
import './style.css';
import UserDropDown from '../DropDown';

function Navbar() {
  return (
    <div className='navbar'>
        <h1><i>SnapQR.</i></h1>
        <UserDropDown/>
    </div>
  )
}

export default Navbar
import React from 'react'
import logo from '../../assets/logo.svg'
import profileImg from '../../assets/profile_image.svg'
import logout from '../../assets/logout.svg'
import './Profile.css'

const Profile = ({ handleLogout }: any) => {
  return (
    <div className='body'>
      <div className="logo_container">
        <img src={logo} alt="logo" className='logo' />
      </div>
      <div className="profile_container">
        <div className="profile_window">
          <img src={profileImg} alt="profile" className='profile_img' />
          <h1>That's it, Jessica!</h1>
          <button className='logout_btn' onClick={handleLogout}>
            <img src={logout} alt="logout" className='logout_img' />
            <span>Logout</span>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Profile
import React from 'react'
import './style.css';
import FacebookIcon from "@mui/icons-material/Facebook";
import EmailIcon from "@mui/icons-material/Email";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from '@mui/icons-material/GitHub';

function Footer() {

  function topFunction() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }


  return (
    <div className='footer'>
        <div className='logo-heading'>
            <h2 className="logo" onClick={() => topFunction()}>
            <i>SnapQR.</i>
        </h2>
        <p>© 2023 <i>SnapQR</i>. All Rights Reserved.</p>
        </div> 
      <div className="footer-links">
        <p>Contact Us</p>
        <p>Privacy Policy</p>
        <p>Terms of Service</p>
      </div>
      <div className="footer-info">
        <p>12/144 Main Street</p>
        <p>Near Zudio, WhiteField</p>
        <p>Banglore,Karnataka-06</p> 
      </div>
      <div className="social-links">
        <a href="https://facebook.com">
          <FacebookIcon className="social-link" />
        </a>
        <a href="mailto:shameerbem@gmail.com">
          <EmailIcon className="social-link" />
        </a>
        <a href="https://www.twitter.com">
          <TwitterIcon className="social-link" />
        </a>
        <a href="https://www.instagram.com">
          <InstagramIcon className="social-link" />
        </a>
        <a href="https://github.com/ShemeerCoder-01">
          <GitHubIcon className="social-link" />
        </a>
      </div>
    </div>
  )
}

export default Footer;
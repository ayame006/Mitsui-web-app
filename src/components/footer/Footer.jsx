import React from "react";
import "./Footer.scss";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className='footer'>
         <Link to='/'>Home</Link>
         <Link>About us</Link>
         <Link>Partners</Link>
         <Link>Contact us</Link>
    </div>
  )
};

export default Footer;

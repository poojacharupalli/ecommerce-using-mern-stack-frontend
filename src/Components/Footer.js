import React from "react";
import './footer.css';
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div className="footer footer  navbar-dark bg-primary">
      <h1 className="text-center">All Rights Reserved &copy;Fashion Kart</h1>
      <p className="text-center links">
        <Link to="/about">About</Link>|<Link to="/contact">Contact</Link>|
        <Link to="/policy">Privacy Policy</Link>
      </p>
    </div>
  );
};

export default Footer;

// import React from 'react'
// 

// import { Link } from 'react-router-dom';

// const Footer = (props) => {
//   return (
//     <div className='footer  navbar-dark bg-primary'>
//       <h1>All Rights Reserved &copy;Fashion Kart</h1>
//       <br/>
//       <p className="links">
//       <Link to='/about'>About</Link>
//       <Link to='/contact'>Contact</Link>
//       <Link to='/privacypolicy'>Privacy Policy</Link>
//       </p>
      
//     </div>
//   )
// }

// export default Footer

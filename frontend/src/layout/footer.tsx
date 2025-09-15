
import React from 'react';


export default function Footer(): React.ReactElement {
  return (

    <footer>
      <div className="footer-container">

      
        <div className="footer-logo">
          <h2>SkinCare Analyzer</h2>
          <p>Your AI-powered skincare companion</p>
        </div>

       
        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/privacy">Privacy Policy</a></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact</h3>
          <p>Email: support@skinapp\.com</p>
          <p className="footer-disclaimer">
            Disclaimer: This app is for educational purposes only and does not
            replace professional medical advice.
          </p>
        </div>
      </div>

     
      <div className="footer-bottom">
        © 2025 SkinCare Analyzer. All rights reserved.
      </div>
    </footer>
  );
}
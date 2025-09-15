// imports
import React, { ReactElement } from 'react';
import Footer from './footer';
import { Link } from 'react-router-dom';
import logo from "../assets/images/layout/header/logo.png";

interface Props {
  topBgImg: string;
  children: ReactElement;
  topSection: ReactElement;
  gotoGetStarted?: () => void;
  gotoHowItWorks?: () => void;
}

export default function Layout({ children, topSection, topBgImg, gotoGetStarted, gotoHowItWorks }: Props): React.ReactElement {
  return (
    <div className='layout'>
      <header className="fixed-top w-100 transition-all duration-300 px-3 px-md-4 px-lg-5 py-2 py-md-3 d-flex justify-content-between align-items-center">
        <Link to="/"><img src={logo} alt='example' /></Link>
        <h1 className='d-none d-lg-block'>𝕤𝕜𝕚𝕟 𝕘𝕝𝕠𝕨</h1>
        <div className='d-flex gap-3 gap-md-5'>
          <button onClick={gotoGetStarted} className="font-weight-bold fs-5 nav-link">Get Started</button>
          <button onClick={gotoHowItWorks} className="font-weight-bold fs-5 nav-link">How it works</button>
        </div>
      </header>
      <div className={`bg-image ${topBgImg}`} >
        <div className="top-section d-flex flex-column-reverse flex-md-row justify-content-center align-items-center min-vh-100">
          {topSection}
        </div>
      </div>
      {children}
      <Footer />
    </div>
  );
}

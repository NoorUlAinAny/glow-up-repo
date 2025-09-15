// imports
import React from 'react';
import { Route, Routes, BrowserRouter as Router } from 'react-router-dom';
import Home from './home';
import NotFound from './notFound';


// exports
export default function App(): React.ReactElement {
  // render
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
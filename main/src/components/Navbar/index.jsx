import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; 

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">UploadIt</Link>
      <div className="nav-links">
        <Link to="/" className="nav-link">Home</Link>
        <Link to="/upload" className="nav-link">Upload</Link>
        <Link to="/files" className="nav-link">Show Files</Link>
      </div>
    </nav>
  );
};

export default Navbar;

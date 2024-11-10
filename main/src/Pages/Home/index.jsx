import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css'; 

const Home = () => {
  return (
    <div className="home-container">
      <h1 className="home-title">Welcome to the File Management App</h1>
      <p className="home-description">
        Easily upload your files to <span className="highlight">AWS S3</span> and manage them from a single place. You can upload files, view them, and delete them when needed.
      </p>
      
      <div className="home-actions">
        <Link to="/upload" className="upload-link">Upload Files</Link>
        <Link to="/files" className="upload-link">View Uploaded Files</Link>
      </div>
    </div>
  );
};

export default Home;

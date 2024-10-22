import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import S3FileUpload from "./pages/upload";
import Home from "./pages/Home";
import Navbar from "./component/navbar";
import ShowFiles from "./pages/Files";


const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<S3FileUpload />} />
        <Route path="/all" element={<ShowFiles />} />
      </Routes>
    </Router>
  );
};

export default App;

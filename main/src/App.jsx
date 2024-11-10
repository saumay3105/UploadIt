import { useState } from "react";
import Home from "./Pages/Home";
import Navbar from "./components/Navbar";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import S3FileUpload from "./Pages/Upload";
import FilesList from "./Pages/Files";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<S3FileUpload/>} />
        <Route path="/all" element={<Home/>} />
        <Route path = "/files" element = {<FilesList/>}/>
      </Routes>
    </Router>
    </div>
  );
}

export default App;

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import View from "./pages/View";

function App() {
  return (
    <>
      <Router>
        <ToastContainer position="top-center" />
        <div className="content">
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/addContact" element={<AddEdit />} />
            <Route path="/update/:id" element={<AddEdit />} />
            <Route path="/view/:id" element={<View />} />
          </Routes>
        </div>
      </Router>
    </>
  );
}

export default App;

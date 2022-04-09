import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Signup } from "./pages";
import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<Home />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;

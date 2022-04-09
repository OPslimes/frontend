import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Signup, NotFound } from "./pages";
import "./styles/App.css";

function App() {
  useEffect(() => {
    console.log("%c Chottomatte! ", "background: #222; color:#3224ff ;font-size:50px");
    console.log(
      "%c If someone told you to paste something in this window.  There's a high chance of you being scammed.  So DO NOT PASTE anything in this window or you can get your account compromised!!! ",
      "background: #222; color:#ff0000 ;font-size:16px"
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" exact element={<NotFound />} />
          <Route path="/" exact element={<Home />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
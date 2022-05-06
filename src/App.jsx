import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { Home, Signup, NotFound, Login, Profile } from "./pages";
import { BsGithub } from "react-icons/bs";
import { useCookies } from "react-cookie";
import "./styles/App.css";
import "./global.css";

function App() {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);

  useEffect(() => {
    console.log("%c Chottomatte! ", "background: #222; color:#3224ff ;font-size:50px");
    console.log(
      "%c If someone told you to paste something in this window.  There's a high chance that you're getting scammed.  So DO NOT PASTE anything in this window or you can get your account compromised!!! ",
      "background: #222; color:#ff0000 ;font-size:16px"
    );
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="*" exact element={<NotFound />} />
          <Route path="/" exact element={<Home />} />
          {!cookies.token ? (
            <>
              <Route path="/signup" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/profile" element={<Profile />} />
            </>
          ) : null}
        </Routes>

        <div className="footer">
          <a className="github-ico" target={"_blank"} rel="noreferrer" href="https://github.com/OPslimes">
            <BsGithub size={35} />
          </a>
        </div>
      </div>
    </Router>
  );
}

export default App;

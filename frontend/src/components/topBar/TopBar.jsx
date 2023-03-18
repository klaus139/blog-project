import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./TopBar.css";

function Navbar() {
  const [showLinks, setShowLinks] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <h1>
          <a href='/'>
          <span className="logo__letter1">O</span>
          <span className="logo__letter2">lean</span> Project
          </a>
        </h1>
      </div>

      <div className="navbar__links" id={showLinks ? "hidden" : ""}>
        <a href="/about">About Us</a>
        <a href="/contact">Contact Us</a>
        <a href="/payment">Payment</a>
        <hr />
        <Link to="/login">
          <button>Login</button>
        </Link>
      </div>
      <div className="navbar__toggle" onClick={() => setShowLinks(!showLinks)}>
        <div className="navbar__hamburger"></div>
      </div>
      {showLinks && (
        <div className="navbar__dropdown">
          <a href="/about">About Us</a>
          <a href="/contact">Contact Us</a>
          <a href="/payment">Payment</a>
          <hr />
        <Link to="/login">
          <button>Login</button>
        </Link>
        </div>
        
      )}
    </nav>
  );
}

export default Navbar;

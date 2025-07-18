import React from "react";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar__logo">EventVerse</div>
      <div className="navbar__actions">
        <button className="navbar__login">Login</button>
        <button className="navbar__singup">Signup</button>
      </div>
    </nav>
  );
}

export default Navbar;

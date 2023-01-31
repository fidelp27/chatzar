import React from 'react';

export default function Navbar() {
  return (
    <nav className="nav-container">
      <h1 className="nav-logo">ChatZar</h1>
      <div className="nav-links">
        <p id="login-btn">Login</p>
        <p id="register-btn">Register</p>
      </div>
    </nav>
  );
}

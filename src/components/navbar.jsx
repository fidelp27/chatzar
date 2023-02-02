import React from 'react';

export default function Navbar() {
  return (
    <nav className="nav-container">
      <h1 className="nav-logo">ChatZar</h1>
      <div className="nav-links">
        <button id="login-btn">Login</button>
        <button id="register-btn">Register</button>
      </div>
    </nav>
  );
}

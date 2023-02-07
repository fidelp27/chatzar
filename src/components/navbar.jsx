import React, { useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
export default function Navbar() {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
    localStorage.setItem('user', true);
  };
  const signOut = () => {
    auth.signOut();
    localStorage.removeItem('user');
  };
  return (
    <nav className="nav-container">
      <h1 className="nav-logo">ChatZar</h1>
      <div className="nav-links">
        {!localStorage.getItem('user') ? (
          <button id="login-btn" onClick={() => googleSignIn()}>
            Login
          </button>
        ) : (
          <button id="register-btn" onClick={() => signOut()}>
            Salir
          </button>
        )}
      </div>
    </nav>
  );
}

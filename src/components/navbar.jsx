import React, { useState } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithRedirect } from 'firebase/auth';
export default function Navbar() {
  const [user] = useAuthState(auth);

  const googleSignIn = () => {
    const provider = new GoogleAuthProvider();
    signInWithRedirect(auth, provider);
  };
  const signOut = () => {
    auth.signOut();
  };
  return (
    <nav className="nav-container">
      <h1 className="nav-logo">ChatZar</h1>
      <div className="nav-links">
        {!user ? (
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

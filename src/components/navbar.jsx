import React from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const googleSignIn = async () => {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    navigate('/chatbox', { replace: true });
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
};
export default Navbar;

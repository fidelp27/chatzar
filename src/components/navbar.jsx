import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import { doc, serverTimestamp, setDoc, updateDoc } from 'firebase/firestore';

const Navbar = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  const createUser = async (user) => {
    //! creación de usuario si no existe, modifica el anterior si ya existe.
    //? Mantiene actualizada la bbdd y evitamos chequear por nuestra cuenta la bbdd para chequear si el usuario existe
    await setDoc(doc(db, 'users', user.uid), {
      name: user.displayName,
      avatar: user.photoURL,
      createdAt: serverTimestamp(),
      uid: user.uid,
      friends: [],
      friendsRequestSend: [],
      friendsRequestReceived: [],
      email: user.email,
      isOnline: true,
    });
  };

  const googleSignIn = async () => {
    try {
      //**  nueva instancia del proveedor de autenticación de Google
      const provider = new GoogleAuthProvider();
      //** ventana emergente para autorizar
      await signInWithPopup(auth, provider);
      navigate('/chatbox', { replace: true });
    } catch (error) {
      console.error(error);
    }
  };

  const signOut = async () => {
    //!referencia al user
    const userUpdate = doc(db, 'users', user.uid);
    //?modificar el user
    await updateDoc(userUpdate, {
      isOnline: false,
    });
    auth.signOut();
  };

  useEffect(() => {
    if (user) {
      createUser(user);
    }
  }, [user]);

  return (
    <nav className="nav-container">
      <h1 className="nav-logo">ChatZar</h1>
      <div className="nav-links">
        {!user ? (
          <button id="login-btn" onClick={() => googleSignIn()}>
            Login
          </button>
        ) : (
          <button id="register-btn" onClick={() => signOut(user)}>
            Salir
          </button>
        )}
      </div>
    </nav>
  );
};
export default Navbar;

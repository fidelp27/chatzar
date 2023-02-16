import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { customError } from '../utils/customError';
import { ToastContainer } from 'react-toastify';

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      customError('Enter valid message');
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    await addDoc(collection(db, 'messages'), {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });
    setMessage('');
    event.target.reset();
    scroll.current.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <>
      <form
        className="form-send-message"
        onSubmit={(event) => sendMessage(event)}
      >
        <label>Enviar</label>
        <input
          type="text"
          name="send-message"
          id="send-message"
          className="form-input"
          placeholder="...text message"
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Enviar</button>
      </form>
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </>
  );
};
export default SendMessage;

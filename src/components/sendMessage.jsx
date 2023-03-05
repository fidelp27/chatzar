import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { customError } from '../utils/customError';
import { useGetRandomOnlineUser } from '../utils/useGetRandomOnlineUser';

const SendMessage = () => {
  const [message, setMessage] = useState('');
  const { user } = useGetRandomOnlineUser();

  const sendMessage = async (event) => {
    event.preventDefault();
    if (message.trim() === '') {
      customError('Enter valid message');
      return;
    }

    const { uid, displayName, photoURL } = auth.currentUser;
    //* Crear una referencia a la subcolección de mensajes
    // Agregar datos a la subcolección de mensajes desde mensajes
    const conversationId = (await user.uid.toString()) + (await uid.toString());
    const messagesRef = collection(
      db,
      'conversations',
      conversationId,
      'messages'
    );
    await addDoc(messagesRef, {
      text: message,
      name: displayName,
      avatar: photoURL,
      createdAt: serverTimestamp(),
      uid,
    });

    setMessage('');
  };

  return (
    <>
      <form
        className="form-send-message"
        onSubmit={(event) => sendMessage(event)}
      >
        <input
          type="text"
          name="send-message"
          id="send-message"
          className="form-input"
          placeholder="...text message"
          onChange={(e) => setMessage(e.target.value)}
          value={message}
        />
        <button type="submit" className="form-button">
          <img src="https://i.imgur.com/mU0KmN8.png" alt="send-icon" />
        </button>
      </form>
    </>
  );
};
export default SendMessage;

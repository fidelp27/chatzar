import React, { useState, useEffect } from 'react';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useParams } from 'react-router-dom';

const Message = ({ message, friendId }) => {
  const [user] = useAuthState(auth);
  const [hour, setHour] = useState('');

  const convertHour = () => {
    if (message && message.createdAt && message.createdAt.seconds !== null) {
      const segundos = message.createdAt.seconds;
      const fecha = new Date(segundos * 1000);
      const hora = fecha.getHours().toString().padStart(2, '0');
      const minutos = fecha.getMinutes().toString().padStart(2, '0');
      const horaEnFormato = `${hora}:${minutos}`;
      setHour(horaEnFormato);
    }
  };

  useEffect(() => {
    convertHour();
  }, [message]);

  return (
    <div className={`chat-bubble ${message.uid === user.uid ? 'right' : ''}`}>
      <div className="chat-bubble__right">
        <Link
          to={
            message.uid === user.uid
              ? '/chat/profile'
              : `/chat/profile_friend/${friendId}`
          }
          className="user-name"
        >
          {message.name}
        </Link>

        <p className="user-message">{message.text}</p>
        <p className="message-time">{hour}</p>
      </div>
    </div>
  );
};
export default Message;

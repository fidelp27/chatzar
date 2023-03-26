import { useEffect, useRef, useState } from 'react';
import {
  query,
  collection,
  orderBy,
  onSnapshot,
  where,
} from 'firebase/firestore';
import { auth, db } from '../firebase';
import SendMessage from './sendMessage';
import Message from './message';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [friendId, setFriendId] = useState('');
  const [disabledInput, setDisabledInput] = useState(false);
  const messagesEndRef = useRef(null);
  const { conversationId } = useParams();
  const [user] = useAuthState(auth);
  //Scroll siempre al final de la conversación
  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  //!Obtener el status de la amistad de los participantes, de ser amigos, se muestra el chat,
  //!de lo contrario, se bloquea la posibilidad de escribir mensajes

  //!Obtener el estatus de la amistad -> error
  const statusFriendship = async () => {
    const q = query(
      collection(db, 'friendships'),
      where('Status', '==', 'Rejected')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) => {
        if (doc.data().id === conversationId) {
          setDisabledInput(true);
        }
      });
      return () => unsubscribe();
    });
  };
  //Obtiene los mensajes de la conversación
  const getMessages = async () => {
    const q = query(
      collection(db, 'conversations', conversationId, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setMessages(messages);
    });
    setFriendId(conversationId.replace(user.uid, ''));
    return () => unsubscribe;
  };

  //Ejecuto las funciones al cargar el componente
  useEffect(() => {
    getMessages();
    statusFriendship();
  }, []);

  //Scroll al final de la conversación
  useEffect(() => {
    scrollBottom();
  }, [messages]);

  return (
    <main className="chat-box">
      <div className="messages-wrapper">
        {messages?.map((message) => (
          <Message key={message.id} message={message} friendId={friendId} />
        ))}
        <div ref={messagesEndRef} />
      </div>
      <SendMessage disabledInput={disabledInput} />
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
        theme="dark"
      />
    </main>
  );
};
export default Chatbox;

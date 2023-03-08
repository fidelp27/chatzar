import { useEffect, useRef, useState } from 'react';
import { query, collection, orderBy, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import SendMessage from './sendMessage';
import Message from './message';
import { ToastContainer } from 'react-toastify';
import { useParams } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [friendId, setFriendId] = useState('');
  const messagesEndRef = useRef(null);
  const { conversationId } = useParams();
  const [user] = useAuthState(auth);

  const scrollBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
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
  }, []);

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
      <SendMessage />
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

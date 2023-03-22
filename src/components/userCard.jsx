import {
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
} from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useGetConversations } from '../utils/useGetConversations';
import ImageError from './imageError';

export default function UserCard({ id, id_conversation }) {
  const [userFriend, setUserFriend] = useState([]);
  const [lastMessage, setLastMessage] = useState('');
  let { conversations } = useGetConversations();

  const getUser = async () => {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    setUserFriend(docSnap.data());
  };

  useEffect(() => {
    getUser();
  }, [id]);

  useEffect(() => {
    const q = query(
      collection(db, 'conversations', id_conversation, 'messages'),
      orderBy('createdAt')
    );
    const unsubscribe = onSnapshot(q, (QuerySnapshot) => {
      let messages = [];
      QuerySnapshot.forEach((doc) => {
        messages.push({ ...doc.data(), id: doc.id });
      });
      setLastMessage(messages[messages.length - 1].text);
      console.log(lastMessage);
      return () => unsubscribe;
    });
  }, []);

  if (!userFriend || Object.keys(userFriend).length === 0) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container-userCard">
      <ImageError user={userFriend} />
      <div className="text-content">
        <p className="user-name">{userFriend.name}</p>
        <p
          className={`conversation-message${
            lastMessage.length > 20 ? ' long-message' : ''
          }`}
        >
          {lastMessage}
        </p>
      </div>
    </div>
  );
}

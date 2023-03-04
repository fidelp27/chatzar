import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useGetOnlineUsers = () => {
  //Buscar personas conectadas
  const [onlineUsers, setOnlineUsers] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'users'), where('isOnline', '==', true));
    const users = [];
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((user) => users.push(user.data()));
    });
    setOnlineUsers(users);
    return () => unsubscribe;
  }, []);

  return onlineUsers;
};

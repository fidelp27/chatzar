import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';

export const useGetOnlineUsers = () => {
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const q = query(collection(db, 'users'), where('isOnline', '==', true));

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((user) => users.push(user.data()));
      setOnlineUsers(users);
      console.log(onlineUsers);
    });

    return unsubscribe;
  }, []);

  return { onlineUsers };
};

import { useState, useEffect } from 'react';
import { collection, query, where, onSnapshot, doc } from 'firebase/firestore';
import { db } from '../firebase';

export const useGetUser = ({ friendId }) => {
  //Buscar personas conectadas
  const [userFriend, setUserFriend] = useState([]);

  try {
    const docRef = doc(db, 'users', friendId);
    const docSnap = getDoc(docRef);
    console.log(docSnap.data());
    setUserFriend(docSnap.data());
  } catch (error) {
    console.log(error);
  }

  return userFriend;
};

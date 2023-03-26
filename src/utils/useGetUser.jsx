import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useGetUser = async (id) => {
  //Buscar personas conectadas
  const [userFriend, setUserFriend] = useState([]);

  try {
    const docRef = doc(db, 'users', id);
    const docSnap = await getDoc(docRef);
    setUserFriend(docSnap.data());
  } catch (error) {
    console.log(error.message);
  }

  return userFriend;
};

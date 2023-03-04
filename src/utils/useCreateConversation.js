import {
  collection,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
} from 'firebase/firestore';
import { auth, db } from '../firebase';

import { useGetRandomOnlineUser } from './useGetRandomOnlineUser';
export const useCreateConversation = () => {
  const { uid, displayName, photoURL } = auth.currentUser;
  const { user, getRandomUser } = useGetRandomOnlineUser();
  const createConversation = async () => {
    getRandomUser();
    const conversationId = (await user.uid.toString()) + (await uid.toString());

    //* Crear una referencia personalizada para la conversación
    if (user.uid !== uid) {
      const conversationRef = doc(db, 'conversations', conversationId);
      await setDoc(conversationRef, {
        members: [user.uid, uid],
      });
      //* Crear una referencia a la subcolección de mensajes
      // Agregar datos a la subcolección de mensajes desde mensajes
      /* 
        const messagesRef = collection(conversationRef, 'messages');

        await addDoc(messagesRef, {
        
        text: '',
        name: displayName,
        avatar: photoURL,
        createdAt: serverTimestamp(),
        uid,
      }); */
    }
  };

  return createConversation;
};

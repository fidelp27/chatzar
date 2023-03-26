import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';

import { useGetRandomOnlineUser } from './useGetRandomOnlineUser';
export const useCreateConversation = () => {
  const { uid } = auth.currentUser;
  const { user, getRandomUser } = useGetRandomOnlineUser();
  const navigate = useNavigate();
  const createConversation = async () => {
    getRandomUser();
    const conversationId = user.uid.toString() + uid.toString();

    //* Crear una referencia personalizada para la conversación
    if (user.uid !== uid) {
      const conversationRef = doc(db, 'conversations', conversationId);
      await setDoc(conversationRef, {
        members: [user.uid, uid],
      });
      navigate(`/chat/${conversationId}`);
      console.log('conversation created');
    }
  };

  return { createConversation };
};

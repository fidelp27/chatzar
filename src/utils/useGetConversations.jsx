import { collection, query, onSnapshot } from 'firebase/firestore';
import { auth, db } from '../firebase';
import { useState, useEffect } from 'react';

export const useGetConversations = () => {
  const [conversations, setConversations] = useState([]);
  const { uid } = auth.currentUser;

  useEffect(() => {
    const q = query(collection(db, 'conversations'));
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const arr_conversations = [];
        querySnapshot.forEach((doc) => {
          arr_conversations.push(doc.data());
        });

        setConversations(
          arr_conversations.filter((conversation) =>
            conversation.members.includes(uid)
          )
        );
      },
      (error) => {
        console.error(error);
      }
    );

    return () => unsubscribe();
  }, []);

  return { conversations };
};

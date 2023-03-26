import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

export const useResponseFriendship = () => {
  //Se acepta la solicitud
  const acceptFriendship = async (id) => {
    const friendshipRef = doc(db, 'friendships', id);
    const friendship = await getDoc(friendshipRef);
    if (friendship.exists()) {
      await updateDoc(friendshipRef, {
        Status: 'Accepted',
      });
      console.log('Friendship accepted');
    }
  };
  // Se rechaza la solicitud y se elimina la conversación asociada
  const rejectFriendship = async (id) => {
    const friendshipRef = doc(db, 'friendships', id);
    const friendship = await getDoc(friendshipRef);
    if (friendship.exists()) {
      await updateDoc(friendshipRef, {
        Status: 'Rejected',
      });
    }
  };

  return [acceptFriendship, rejectFriendship];
};

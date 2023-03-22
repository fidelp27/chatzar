import {
  arrayUnion,
  doc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';

export const useCreateFriendship = () => {
  const createFriendship = async (
    friendRequestSender,
    friendRequestReceiver
  ) => {
    const friendshipId =
      (await friendRequestSender.toString()) +
      (await friendRequestReceiver.toString());

    const friendshipRef = doc(db, 'friendships', friendshipId);
    await setDoc(friendshipRef, {
      user1: friendRequestSender,
      user2: friendRequestReceiver,
      Status: 'Pendiente',
      createdAt: serverTimestamp(),
    });

    const senderRef = doc(db, 'users', friendRequestSender);
    const receiverRef = doc(db, 'users', friendRequestReceiver);

    await updateDoc(senderRef, {
      friendsRequestSend: arrayUnion(friendRequestReceiver),
    });

    await updateDoc(receiverRef, {
      friendsRequestReceived: arrayUnion(friendRequestSender),
    });
  };
  return { createFriendship };
};

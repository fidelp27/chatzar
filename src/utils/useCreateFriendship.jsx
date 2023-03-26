import {
  arrayUnion,
  doc,
  getDoc,
  serverTimestamp,
  setDoc,
  updateDoc,
} from 'firebase/firestore';
import { db } from '../firebase';
import { customError, customSuccess } from './customError';

export const useCreateFriendship = () => {
  const createFriendship = async (
    friendRequestSender,
    friendRequestReceiver
  ) => {
    //** creo el id para la amistad
    const friendshipId =
      (await friendRequestSender.toString()) +
      (await friendRequestReceiver.toString());
    const inverseFriendshipId =
      (await friendRequestReceiver.toString()) +
      (await friendRequestSender.toString());

    //** Creo las referencias a las colecciones de amistades
    const friendshipRef = doc(db, 'friendships', friendshipId);
    const inverseFriendshipRef = doc(db, 'friendships', inverseFriendshipId);

    //** Si ya existe la solicitud, no pasa nada

    const friendshipSnapshot = await getDoc(friendshipRef);
    const inverseFriendshipSnapshot = await getDoc(inverseFriendshipRef);

    if (friendshipSnapshot.exists() || inverseFriendshipSnapshot.exists()) {
      customError('Ya existe una solicitud de amistad');
      return;
    } else {
      //** Si no existe la solicitud, creo la amistad en la colección de amistades

      await setDoc(friendshipRef, {
        Sender: friendRequestSender,
        Receiver: friendRequestReceiver,
        Status: 'Pending',
        createdAt: serverTimestamp(),
      });
      // ** actualizo los campos de la colección de usuarios
      const senderRef = doc(db, 'users', friendRequestSender);
      const receiverRef = doc(db, 'users', friendRequestReceiver);

      await updateDoc(senderRef, {
        friendsRequestSend: arrayUnion(friendRequestReceiver),
      });

      await updateDoc(receiverRef, {
        friendsRequestReceived: arrayUnion(friendRequestSender),
      });
    }
    // ** Mensaje de success en el toast
    customSuccess('Solicitud de amistad enviada');
  };

  return { createFriendship };
};

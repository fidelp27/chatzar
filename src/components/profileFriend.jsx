import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { auth, db } from '../firebase';
import { useCreateFriendship } from '../utils/useCreateFriendship';
import { useGetUser } from '../utils/useGetUser';
import Profile_template from './profile_template';

export default function ProfileFriend() {
  //!Falta traer la información del amigo activo en el chat
  //? La comparto con un hook o es necesario implementar Context?
  const { friendId } = useParams();
  const { uid } = auth.currentUser;

  const [friend, setFriend] = useState('');
  const { createFriendship } = useCreateFriendship();
  useEffect(() => {
    async function fetchFriendData() {
      const docRef = doc(db, 'users', friendId);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setFriend(docSnap.data());
      }
    }
    fetchFriendData();
  }, [friendId]);

  return (
    <Profile_template user={friend}>
      <div className="container-invitation">
        <button>
          {' '}
          <img
            src="https://i.imgur.com/nEkCQFL.png"
            className="icon-action"
            alt="item"
            onClick={() => createFriendship(uid, friendId)}
          />
        </button>
      </div>
      <ul>
        <li>Block</li>
        <li>Delete</li>
        <li>Report</li>
      </ul>
    </Profile_template>
  );
}

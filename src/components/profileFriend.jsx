import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { db } from '../firebase';
import { useGetUser } from '../utils/useGetUser';
import Profile_template from './profile_template';

export default function ProfileFriend() {
  //!Falta traer la información del amigo activo en el chat
  //? La comparto con un hook o es necesario implementar Context?
  const { friendId } = useParams();
  const [friend, setFriend] = useState('');

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
      <ul>
        <li>Block</li>
        <li>Delete</li>
        <li>Report</li>
      </ul>
    </Profile_template>
  );
}

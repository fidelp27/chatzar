import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Profile_template from './profile_template';

export default function ProfileFriend() {
  //!Falta traer la información del amigo activo en el chat
  //? La comparto con un hook o es necesario implementar Context?
  const [user] = useAuthState(auth);

  return (
    <Profile_template user={user}>
      <ul>
        <li>Block</li>
        <li>Delete</li>
        <li>Report</li>
      </ul>
    </Profile_template>
  );
}

import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Link, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';
import Profile_template from './profile_template';

const ProfileUser = () => {
  const [user] = useAuthState(auth);

  return (
    <Profile_template user={user}>
      <div className="container-options">
        <ul>
          <Link to="/chat/friends">Friends</Link>
          <Link to="/chat/conversations">Messages</Link>
        </ul>
      </div>
      <div className="container-actions">
        <ul>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </Profile_template>
  );
};
export default ProfileUser;

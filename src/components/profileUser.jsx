import React from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';

const ProfileUser = ({ setShow }) => {
  const [user] = useAuthState(auth);
  return (
    <div className="container-userProfile">
      <span className="btn-close" onClick={() => setShow(false)}>
        X
      </span>
      <div className="container-info">
        <img
          src={user.photoURL}
          className="profile-img"
          alt={user.displayName}
        />
        <p className="user-name">{user.displayName}</p>
        <p className="user-email">{user.email}</p>
        <p className="user-date">Member since: {user.metadata.creationTime}</p>
      </div>
      <div className="container-options">
        <ul>
          <li>Friends</li>
          <li>Messages</li>
        </ul>
      </div>
      <div className="container-actions">
        <ul>
          <li>Settings</li>
          <li>Logout</li>
        </ul>
      </div>
    </div>
  );
};
export default ProfileUser;

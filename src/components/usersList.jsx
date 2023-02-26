import React, { useState } from 'react';
import userAvatar from '../utils/userAvatar';
const UsersList = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  return (
    <div className="container-usersList">
      {!imageError ? (
        <img src={user.avatar} alt={user.name} onError={handleImageError} />
      ) : (
        <p className="user-avatar-error">{userAvatar(user.name)}</p>
      )}
      <p>{user.name}</p>
      <img
        src={
          user.isOnline
            ? 'https://i.imgur.com/c2UXdcl.png'
            : 'https://i.imgur.com/yFjAmvy.png'
        }
        alt="icon-state"
      />
      <img
        src="https://i.imgur.com/R6LI8wh.png"
        className="icon-action"
        alt="icon-action"
      />
    </div>
  );
};
export default UsersList;

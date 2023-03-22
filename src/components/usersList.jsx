import React from 'react';
import ImageError from './imageError';
const UsersList = ({ user }) => {
  return (
    <div className="container-usersList">
      <ImageError user={user} />
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

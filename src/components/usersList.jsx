import React, { useState } from 'react';

const UsersList = ({ user }) => {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  console.log(user);
  return (
    <div className="container-usersList">
      {!imageError ? (
        <img src={user.avatar} alt={user.name} onError={handleImageError} />
      ) : (
        <p>{userAvatar(user.name)}</p>
      )}
      <p>{user.name}</p>
      {user.isOnline ? <span>Activo</span> : <span>Inactivo</span>}
    </div>
  );
};
export default UsersList;

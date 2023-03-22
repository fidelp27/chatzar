import React, { useState } from 'react';
import userAvatar from '../utils/userAvatar';

export default function ImageError({ user }) {
  const [imageError, setImageError] = useState(false);
  const handleImageError = () => {
    setImageError(true);
  };
  console.log(imageError);
  return (
    <>
      {!imageError ? (
        <img src={user.avatar} alt={user.name} onError={handleImageError} />
      ) : (
        <p className="user-avatar-error">{userAvatar(user.name)}</p>
      )}
    </>
  );
}

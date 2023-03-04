import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Profile_template({ user, children }) {
  const navigate = useNavigate();

  return (
    <div className="container-userProfile">
      <span className="btn-close" onClick={() => navigate(-1)}>
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
      {children}
    </div>
  );
}

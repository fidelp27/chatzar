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
          src={user?.photoURL || user?.avatar}
          className="profile-img"
          alt={user?.displayName || user?.name}
        />
        <p className="user-name">{user?.displayName || user?.name}</p>
        <p className="user-email">{user?.email}</p>
      </div>
      {children}
    </div>
  );
}

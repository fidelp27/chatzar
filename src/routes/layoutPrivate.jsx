import React, { useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { Outlet, useNavigate } from 'react-router-dom';
import { auth } from '../firebase';

const LayoutPrivate = () => {
  const [user] = useAuthState(auth);
  const navigate = useNavigate();

  return <>{user ? <Outlet /> : navigate('/')}</>;
};
export default LayoutPrivate;

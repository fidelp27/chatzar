import React from 'react';
import { Outlet } from 'react-router-dom';
import { auth } from '../firebase';
import { useAuthState } from 'react-firebase-hooks/auth';
export default function Layout() {
  const [user] = useAuthState(auth);

  return (
    <>
      <Outlet />
    </>
  );
}

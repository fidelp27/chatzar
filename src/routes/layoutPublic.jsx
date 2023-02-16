import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../components/navbar';

const LayoutPublic = () => {
  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};
export default LayoutPublic;

import { useGetOnlineUsers } from './useGetOnlineUsers';
import { useState, useEffect } from 'react';
export const useGetRandomOnlineUser = () => {
  const onlineUsers = useGetOnlineUsers();
  const [user, setUser] = useState({});

  const getRandomUser = () => {
    const randomIndex = Math.floor(Math.random() * onlineUsers.length);
    setUser(onlineUsers[randomIndex]);
    console.log(user);
  };

  return { getRandomUser, user };
};

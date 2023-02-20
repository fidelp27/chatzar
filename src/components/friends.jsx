import { collection, getDocs } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import UsersList from './usersList';

export default function Friends() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);

  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, 'users'));
    const usersData = [];
    querySnapshot.forEach((user) => {
      usersData.push(user.data());
    });
    setUsers([...usersData]);
  };
  console.log(users);
  const filterUsers = async (word) => {
    if (word.trim().length > 0) {
      setFilteredUsers(
        users.filter(
          (user) =>
            user.email.toLowerCase().includes(word.toLowerCase()) ||
            user.name.toLowerCase().includes(word.toLowerCase())
        )
      );
    } else {
      setUsers(users);
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  useEffect(() => {
    filterUsers(search);
  }, [search]);

  return (
    <div className="container-friends">
      <div className="filter-users-container">
        <input
          type="text"
          className="search-input"
          placeholder="... write a email address"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        {search.trim().length > 0
          ? (search.trim().length > 0 ? filteredUsers : users).map((user) => {
              return <UsersList user={user} key={user.uid} />;
            })
          : null}
      </div>

      <div className="friends-section"></div>
    </div>
  );
}

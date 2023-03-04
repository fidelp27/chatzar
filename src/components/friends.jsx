import { collection, getDocs, onSnapshot } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import UsersList from './usersList';
import { useCreateConversation } from '../utils/useCreateConversation';
export default function Friends() {
  const [search, setSearch] = useState('');
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const createConversation = useCreateConversation();
  /* const getUsers = async () => {
    const querySnapshot = await collection(db, 'users');
    onSnapshot(querySnapshot, (snapshot) => {
      const usersData = [];
      snapshot.forEach((user) => {
        usersData.push(user.data());
      });
      setUsers([...usersData]);
    });
  }; */

  const getFriends = async () => {
    if (user) {
      setFriends(users.filter((elem) => elem.uid == user.uid));
    }
  };

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

  /*   useEffect(() => {
    getUsers();
  }, []); */

  useEffect(() => {
    filterUsers(search);
  }, [search]);

  return (
    <div className="container-friends">
      <input
        type="text"
        className="search-input"
        placeholder="... write a name or email address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <div className="filter-users-container">
        {search.trim().length > 0
          ? (search.trim().length > 0 ? filteredUsers : users).map((user) => {
              return <UsersList user={user} key={user.uid} />;
            })
          : null}
      </div>

      <div className="friends-section">
        {!friends || friends.length <= 0 ? (
          <>
            <p>You have no friends yet</p>
            <img src="https://i.imgur.com/6r6251D.png" alt="lookingfor-img" />
            <button onClick={() => navigate(-1)}>Volver</button>
            <button onClick={() => createConversation()}>
              Crear conversación
            </button>
          </>
        ) : (
          friends.map((user) => {
            return <UsersList user={friends} key={user.uid} />;
          })
        )}
      </div>
    </div>
  );
}

import { doc, getDoc } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { db } from '../firebase';
import { useResponseFriendship } from '../utils/useResponseFriendship';
import ImageError from './imageError';
const UsersList = ({ id, id_conversation, hide }) => {
  const [user, setUser] = useState([]);
  const [acceptFriendship, rejectFriendship] = useResponseFriendship();
  console.log(user);
  const accept_request = (id) => {
    acceptFriendship(id);
  };
  const reject_request = (id) => {
    rejectFriendship(id);
  };
  //Obtener el usuario
  const getUser = async (id) => {
    try {
      const docRef = doc(db, 'users', id);
      const docSnap = await getDoc(docRef);
      setUser(docSnap.data());
    } catch (error) {
      console.log(error.message);
    }
  };
  useEffect(() => {
    getUser(id);
  }, []);

  return (
    <div
      className={
        hide ? 'container-usersList last-p' : 'container-usersList last-div'
      }
    >
      <ImageError user={user} />
      <p>{user.name}</p>
      <div className={hide ? 'hide' : 'icons-action'}>
        <img
          src="https://i.imgur.com/MOlHjX2.png"
          className="icon-action"
          alt="icon-state"
          onClick={() => accept_request(id_conversation)}
        />
        <img
          src="https://i.imgur.com/byZ507C.png"
          className="icon-action"
          alt="icon-action"
          onClick={() => reject_request(id_conversation)}
        />
      </div>
    </div>
  );
};
export default UsersList;

import { collection, onSnapshot, query, where } from 'firebase/firestore';
import React, { useState, useEffect } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebase';
import UsersList from './usersList';
import { useCreateConversation } from '../utils/useCreateConversation';
import { useResponseFriendship } from '../utils/useResponseFriendship';
export default function Friends() {
  const [search, setSearch] = useState('');
  const [friends, setFriends] = useState([]);
  const [sent, setSent] = useState([]);
  const [received, setReceived] = useState([]);
  const [user] = useAuthState(auth);
  const navigate = useNavigate();
  const { createConversation } = useCreateConversation();

  //**Obtener todos los amigos */
  const getFriends = async () => {
    const q = query(
      collection(db, 'friendships'),
      where('Status', '==', 'Accepted')
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const friends = [];
      querySnapshot.forEach((doc) => {
        if (doc.data().Sender === user.uid) {
          friends.push(doc.data().Receiver);
        } else if (doc.data().Receiver === user.uid) {
          friends.push(doc.data().Sender);
        } else {
          console.log('No hay amigos');
        }
        setFriends(friends);
      });
      return () => unsubscribe();
    });
  };
  //**Obtener todas las solicitudes enviadas en tiempo real con onSnapshot */
  const getSent = async () => {
    const q = query(
      collection(db, 'friendships'),
      where('Status', '==', 'Pending'),
      where('Sender', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const sentrequests = [];
      querySnapshot.forEach((doc) => {
        sentrequests.push({
          id_receiver: doc.data().Receiver,
          id_conversation: doc.id,
        });
      });
      setSent(sentrequests);
      console.log(sent);
    });
    return () => unsubscribe();
  };

  //**Obtener todas las solicitudes recibidas en tiempo real */
  const getReceived = async () => {
    const q = query(
      collection(db, 'friendships'),
      where('Status', '==', 'Pending'),
      where('Receiver', '==', user.uid)
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const receivedrequests = [];
      querySnapshot.forEach((doc) => {
        receivedrequests.push({
          id_sender: doc.data().Sender,
          id_conversation: doc.id,
        });
      });
      setReceived(receivedrequests);
      console.log(received);
    });
    return () => unsubscribe();
  };

  useEffect(() => {
    getFriends();
    getSent();
    getReceived();
  }, []);
  return (
    <div className="container-friends">
      {/* Filtro de busqueda */}
      <input
        type="text"
        className="search-input"
        placeholder="... write a name or email address"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      {/* Solicitudes recibidas */}
      <div
        className={
          !received || received.length <= 0
            ? 'hide'
            : 'filtered-received-request'
        }
      >
        Solicitudes recibidas
        {received.map((ids) => {
          return (
            <UsersList
              id={ids.id_sender}
              id_conversation={ids.id_conversation}
              key={ids.id_conversation}
              hide={false}
            />
          );
        })}
      </div>

      {/* Solicitudes enviadas */}
      <div
        className={!sent || sent.length <= 0 ? 'hide' : 'filtered-sent-request'}
      >
        Solicitudes enviadas
        {sent.map((ids) => {
          return (
            <UsersList
              id={ids.id_receiver}
              id_conversation={ids.id_conversation}
              key={ids.id_conversation}
              hide={false}
            />
          );
        })}
      </div>

      {/* Amistades */}
      <div className="friends-section">
        Amigos
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
            return <UsersList id={user} key={user.uid} hide={true} />;
          })
        )}
      </div>
    </div>
  );
}

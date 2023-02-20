import React, { useState } from 'react';
import Chatbox from '../components/chatbox';
import Friends from '../components/friends';
import ProfileUser from '../components/profileUser';
export default function Chat() {
  const [show, setShow] = useState(false);

  return (
    <>
      <>
        {show ? (
          <>
            <ProfileUser setShow={setShow} />
            <Chatbox setShow={setShow} />
          </>
        ) : (
          <Friends />
        )}
      </>
    </>
  );
}

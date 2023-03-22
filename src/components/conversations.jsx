import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useGetConversations } from '../utils/useGetConversations';
import Container from './container';
import UserCard from './userCard';

const Conversations = () => {
  let { conversations } = useGetConversations();
  const { uid } = auth.currentUser;
  return (
    <Container>
      <div
        className="conversations-container"
        style={{ display: 'flex', flexDirection: 'column' }}
      >
        {React.Children.toArray(
          conversations.map((conversation) =>
            conversation.members.map((member) =>
              member !== uid ? (
                <>
                  <Link
                    to={`/chat/${
                      conversation.members[0].toString() +
                      conversation.members[1].toString()
                    }`}
                    key={member}
                  >
                    <UserCard
                      id={member}
                      id_conversation={
                        conversation.members[0].toString() +
                        conversation.members[1].toString()
                      }
                    />
                  </Link>
                </>
              ) : null
            )
          )
        )}
      </div>
    </Container>
  );
};
export default Conversations;

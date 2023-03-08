import React from 'react';
import { Link } from 'react-router-dom';
import { auth } from '../firebase';
import { useGetConversations } from '../utils/useGetConversations';

const Conversations = () => {
  //!Lista de conversaciones activar filtradas por el usuario activo
  //!Así abrimos la conversación desde este panel y obtenemos la referencia
  //!Usamos useParams para abrir la ventana de chat correcta
  let { conversations } = useGetConversations();
  const { uid } = auth.currentUser;

  return (
    <div
      className="conversations-container"
      style={{ display: 'flex', flexDirection: 'column' }}
    >
      {React.Children.toArray(
        conversations.map((conversation) =>
          conversation.members.map((member) =>
            member !== uid ? (
              <Link
                to={`/chat/${
                  conversation.members[0].toString() +
                  conversation.members[1].toString()
                }`}
                key={member}
              >
                {member}
              </Link>
            ) : null
          )
        )
      )}
    </div>
  );
};
export default Conversations;

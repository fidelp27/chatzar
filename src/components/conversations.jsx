import React from 'react';
import { auth } from '../firebase';
import { useGetConversations } from '../utils/useGetConversations';

const Conversations = () => {
  //!Lista de conversaciones activar filtradas por el usuario activo
  //!Así abrimos la conversación desde este panel y obtenemos la referencia
  //!Usamos useParams para abrir la ventana de chat correcta
  let { conversations } = useGetConversations();
  const { uid } = auth.currentUser;

  console.log(conversations);
  return (
    <div>
      {conversations.map((conversation) =>
        conversation.members.map((member) =>
          member !== uid ? <p key={member}>{member}</p> : null
        )
      )}
    </div>
  );
};
export default Conversations;

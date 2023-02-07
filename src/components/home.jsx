import React from 'react';

export default function Home() {
  return (
    <div className="container-welcome">
      <div className="container-section-content">
        <h2> CONOCE PERSONAS AL AZAR CON</h2>
        <h2 className="name">CHATZAR</h2>
        <p>
          Con nuestra app de chat al azar, puedes chatear con personas de todo
          el mundo y hacer amigos en un abrir y cerrar de ojos
        </p>
        <button className="button-cta">Comienza YA</button>
      </div>
      <div className="container-section-image">
        <img
          src="https://i.imgur.com/XGANX9q.png"
          className="image-welcome"
          alt="imagen"
        />
      </div>
    </div>
  );
}

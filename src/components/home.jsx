import React from 'react';

export default function Home() {
  return (
    <div className="container-welcome">
      <div className="container-section container-section-content">
        <h2> ¡Bienvenido a Chat-Zar! </h2>
        <p>
          ¿Estás listo para conocer a alguien nuevo y tener una experiencia
          única?
        </p>
        <p>
          Con nuestra app de chat al azar, puedes chatear con personas de todo
          el mundo y hacer amigos en un abrir y cerrar de ojos
        </p>
        <p>
          ¡Regístrate hoy y empieza a explorar nuevas perspectivas y a hacer
          amigos al azar!
        </p>
      </div>
      <img
        src="https://i.imgur.com/shvLvit.png"
        className="image-welcome"
        alt="imagen"
      />
    </div>
  );
}

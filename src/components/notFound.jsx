import React from 'react';
import { useRouteError, Link } from 'react-router-dom';
const NotFound = () => {
  const error = useRouteError();
  return (
    <div>
      <h1>404</h1>
      <p>Page Not Found</p>
      <p>{error.statusText || error.message}</p>
      <Link to="/">Inicio</Link>
    </div>
  );
};

export default NotFound;

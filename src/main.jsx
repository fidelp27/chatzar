import React from 'react';
import ReactDOM from 'react-dom/client';
import './scss/styles.scss';
import { router } from './routes';
import { RouterProvider } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

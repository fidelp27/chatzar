import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../views/homepage';
import NotFound from '../components/notFound';
import Layout from './layout';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
    ],
  },
]);

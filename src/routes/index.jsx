import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../views/homepage';
import NotFound from '../components/notFound';
import Chatbox from '../components/chatbox';
import LayoutPublic from './layoutPublic';
import LayoutPrivate from './layoutPrivate';
import ProfileUser from '../components/profileUser';
import Chat from '../views/chat';

export const router = createBrowserRouter([
  {
    path: '/',
    element: <LayoutPublic />,
    errorElement: <NotFound />,
    children: [
      {
        path: '/',
        element: <Homepage />,
      },
      {
        path: '/chat',
        element: <LayoutPrivate />,
        children: [
          {
            index: true,
            element: <Chat />,
          },
        ],
      },
    ],
  },
]);

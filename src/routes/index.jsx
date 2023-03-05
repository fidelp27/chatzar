import { createBrowserRouter } from 'react-router-dom';
import Homepage from '../views/homepage';
import NotFound from '../components/notFound';
import LayoutPublic from './layoutPublic';
import LayoutPrivate from './layoutPrivate';
import ProfileUser from '../components/profileUser';
import Chat from '../views/chat';
import Friends from '../components/friends';
import ProfileFriend from '../components/profileFriend';
import Conversations from '../components/conversations';

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
            path: '/chat',
            element: <Chat />,
          },
          {
            path: '/chat/friends',
            element: <Friends />,
          },
          {
            path: '/chat/profile',
            element: <ProfileUser />,
          },
          {
            path: '/chat/profile_friend',
            element: <ProfileFriend />,
          },
          {
            path: '/chat/conversations',
            element: <Conversations />,
          },
        ],
      },
    ],
  },
]);

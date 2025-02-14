import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '@pages/home/Home';
import { Outbound } from '@/pages/outbound/Outbound';
import { Camera } from '@/pages/camera/Camera';
import Chat from '@/pages/chat/Chat';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/outbound/*',
        element: <Outbound />,
      },
      {
        path: '/camera',
        element: <Camera />,
      },
      {
        path: '/chat',
        element: <Chat />,
      }
    ]
  }
]);

export default router;
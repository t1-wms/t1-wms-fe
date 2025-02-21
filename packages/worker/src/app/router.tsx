import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import Home from '@pages/home/Home';
import { Outbound } from '@/pages/outbound/Outbound';
import { Camera } from '@/pages/camera/Camera';
import Chat from '@/pages/chat/Chat';
// import Task from '@/pages/tasklist/Task';
import {Inbound} from '../pages/inbound1/Inbound';
import InboundListPage, { exampleData }  from '@/pages/inbound1/ui/TodayList';


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
        path: '/inbound/*', 
        element: <Inbound />,
      },
      {
        path: '/camera',
        element: <Camera />,
      },
      {
        path: '/chat',
        element: <Chat />,
      },
      {
        path: '/task',
        element: <InboundListPage inboundWorks={exampleData} />,
      },
    ]
  }
]);

export default router;
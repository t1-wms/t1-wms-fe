import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { LoginPage } from "@pages/login";
import UserPage from "@pages/user/ui/UserPage";
import { OutBoundPlanPage } from "@/pages/outbound-plan";
import OutboundAssignPage from "@/pages/outbound-assign/ui/OutboundAssignPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/outbound/plan",
        element: <OutBoundPlanPage />,
      },
      {
        path: "/outbound/assign",
        element: <OutboundAssignPage />,
      },
    ],
  },
]);

export default router;

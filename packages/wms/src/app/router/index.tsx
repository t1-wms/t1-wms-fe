import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { LoginPage } from "@pages/login";
import UserPage from "@pages/user/ui/UserPage";
import { OutBoundPlanPage } from "@/pages/outbound-plan";
import { OutboundAssignPage } from "@/pages/outbound-assign";
import { OutboundPickingPage } from "@/pages/outbound-picking";
import { OutboundPackingPage } from "@/pages/outbound-packing";
import { OutboundLoadingPage } from "@/pages/outbound-loading";

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
      {
        path: "/outbound/picking",
        element: <OutboundPickingPage />,
      },
      {
        path: "/outbound/packing",
        element: <OutboundPackingPage />,
      },
      {
        path: "/outbound/loading",
        element: <OutboundLoadingPage />,
      },
    ],
  },
]);

export default router;

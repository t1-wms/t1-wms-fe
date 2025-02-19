import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { LoginPage } from "@pages/login";
import UserPage from "@pages/user/ui/UserPage";
import { OutBoundPlanPage } from "@/pages/outbound-plan";
import { OutboundAssignPage } from "@/pages/outbound-assign";
import { OutboundPickingPage } from "@/pages/outbound-picking";
import { OutboundPackingPage } from "@/pages/outbound-packing";
import { OutboundLoadingPage } from "@/pages/outbound-loading";
import OrderPage from "@/pages/order";
import ReceivedOrder from "@/pages/received-order";
import { InboundSchedulePage } from "@/pages/inbound-schedule";
import { InboundCheckPage } from "@/pages/inbound-check";
import ProductPage from "@/pages/product";
import SupplierPage from "@/pages/supplier";
import DashBoardPage from "@/pages/dashboard/ui/DashboardPage";
import ThresholdPage from "@/pages/threshold";

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
        path: "/dashboard",
        element: <DashBoardPage />,
      },
      {
        path: "/user",
        element: <UserPage />,
      },
      {
        path: "/master/supplier",
        element: <SupplierPage />,
      },
      {
        path: "/order",
        element: <OrderPage />,
      },
      {
        path: "/received-order",
        element: <ReceivedOrder />,
      },
      {
        path: "/inbound/schedule",
        element: <InboundSchedulePage />,
      },
      {
        path: "/inbound/check",
        element: <InboundCheckPage />,
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
      {
        path: "/inventory/product",
        element: <ProductPage />,
      },
      {
        path: "/inventory/threshold",
        element: <ThresholdPage />,
      },
    ],
  },
]);

export default router;

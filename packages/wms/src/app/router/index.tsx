import BinPage from "@/pages/bin";
import DashBoardPage from "@/pages/dashboard/ui/DashboardPage";
import { InboundCheckPage } from "@/pages/inbound-check";
import { InboundPutAwayPage } from "@/pages/inbound-put-away";
import { InboundSchedulePage } from "@/pages/inbound-schedule";
import OrderPage from "@/pages/order";
import { OutboundAssignPage } from "@/pages/outbound-assign";
import { OutboundLoadingPage } from "@/pages/outbound-loading";
import { OutboundPackingPage } from "@/pages/outbound-packing";
import { OutboundPickingPage } from "@/pages/outbound-picking";
import { OutBoundPlanPage } from "@/pages/outbound-plan";
import ProductPage from "@/pages/product";
import ReceivedOrder from "@/pages/received-order";
import SupplierPage from "@/pages/supplier";
import ThresholdPage from "@/pages/threshold";
import { ErrorFallbackPage } from "@/shared";
import { LoginPage } from "@pages/login";
import UserPage from "@pages/user/ui/UserPage";
import { createBrowserRouter } from "react-router";
import { App } from "../App";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorFallbackPage />,
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
        path: "/inbound/put-away",
        element: <InboundPutAwayPage />,
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
        path: "/inventory/bin",
        element: <BinPage />,
      },
      {
        path: "/inventory/threshold",
        element: <ThresholdPage />,
      },
    ],
  },
]);

export default router;

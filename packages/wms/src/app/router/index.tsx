import { createBrowserRouter } from "react-router";
import { App } from "../App";
import { LoginPage } from "@pages/login";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <LoginPage />,
      },
    ],
  },
]);

export default router;

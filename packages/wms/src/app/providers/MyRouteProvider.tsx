import { RouterProvider } from "react-router";
import router from "../router";

export const MyRouteProvider = () => {
  return <RouterProvider router={router} />;
};

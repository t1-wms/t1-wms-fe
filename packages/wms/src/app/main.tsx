import "@t1-wms-fe/shared";
import { createRoot } from "react-dom/client";
import { MyRouteProvider, QueryProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <MyRouteProvider />
  </QueryProvider>
);

import "@t1-wms-fe/shared";
import { createRoot } from "react-dom/client";
import { MyRouteProvider, QueryProvider } from "./providers";
import { AppModal } from "@/widgets";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <MyRouteProvider />
    <AppModal />
  </QueryProvider>
);

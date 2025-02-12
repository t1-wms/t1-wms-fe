import "@t1-wms-fe/shared";
import { createRoot } from "react-dom/client";
import { MyRouteProvider } from "./providers/MyRouteProvider";
import { QueryProvider } from "./providers/QueryClientProvider";
import { ModalProvider } from "./providers/ModalProvider";

createRoot(document.getElementById("root")!).render(
  <QueryProvider>
    <ModalProvider>
      <MyRouteProvider />
    </ModalProvider>
  </QueryProvider>
);

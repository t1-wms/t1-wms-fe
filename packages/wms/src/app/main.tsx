import { ErrorBoundary, ErrorFallbackPage } from "@/shared";
import { AppModal } from "@/widgets";
import "@t1-wms-fe/shared";
import { createRoot } from "react-dom/client";
import { MyRouteProvider, QueryProvider } from "./providers";

createRoot(document.getElementById("root")!).render(
  <ErrorBoundary fallback={<ErrorFallbackPage />}>
    <QueryProvider>
      <MyRouteProvider />
      <AppModal />
    </QueryProvider>
  </ErrorBoundary>
);

import { ErrorBoundary, ErrorFallback } from "@/shared";
import { PageFrame } from "@widgets/page-frame";
import { Outlet, useLocation } from "react-router";

export const App = () => {
  const { pathname } = useLocation();

  if (pathname === "/") {
    return <Outlet />;
  } else {
    return (
      <PageFrame>
        <ErrorBoundary fallback={<ErrorFallback />}>
          <Outlet />
        </ErrorBoundary>
      </PageFrame>
    );
  }
};

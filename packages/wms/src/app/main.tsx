import "@t1-wms-fe/shared";
import { createRoot } from "react-dom/client";
import { MyRouteProvider } from "./providers/MyRouteProvider";

createRoot(document.getElementById("root")!).render(<MyRouteProvider />);

import { serverUrl } from "@/shared";
import { ReactNode, useEffect, useRef } from "react";

interface SseProviderProps {
  children: ReactNode;
}

export function SseProvider({ children }: SseProviderProps) {
  const userId = sessionStorage.getItem("userId");

  const eventSource = useRef<EventSource>();

  useEffect(() => {
    console.log("Try SSE Connection");
    eventSource.current = new EventSource(`${serverUrl}/api/sse/USER_ADMIN`);

    eventSource.current.onopen = () => {
      console.log("SSE Connection Success");
    };

    eventSource.current.addEventListener("connect", () => {
      console.log("SSE Connection Success");
    });

    eventSource.current.addEventListener("message", () => {
      console.log("SSE got message");
    });

    eventSource.current.addEventListener(
      "AWARDS_NOTIFICATION",
      (event: MessageEvent<string>) => {
        console.log(event);
      }
    );

    eventSource.current.onerror = () => {
      console.log("SSE Connection Failed");
    };

    eventSource.current.onmessage = (ev) => {
      console.log(ev);
    };

    return () => {
      if (eventSource.current) {
        eventSource.current.close();
        eventSource.current = undefined;
      }
    };
  }, [userId]);

  return <>{children}</>;
}

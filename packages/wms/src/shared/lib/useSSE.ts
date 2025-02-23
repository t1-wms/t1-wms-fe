import { useEffect, useRef } from "react";
import { serverUrl } from "../api";

export const useSSE = (onOutboundChange: () => void) => {
  const eventSource = useRef<EventSource>();

  useEffect(() => {
    console.log("Try SSE Connection");
    eventSource.current = new EventSource(
      `${serverUrl}/api/sse?role=ROLE_ADMIN`
    );

    eventSource.current.onopen = () => {
      console.log("SSE Connection Success");
    };

    eventSource.current.addEventListener("connect", () => {
      console.log("SSE Connection Success");
    });

    eventSource.current.addEventListener("message", () => {
      console.log("SSE got message");
    });

    eventSource.current.addEventListener("NOTIFICATION", () => {
      onOutboundChange();
    });

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
  }, [onOutboundChange]);
};

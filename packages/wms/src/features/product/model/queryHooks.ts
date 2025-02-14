import { useSuspenseQuery } from "@tanstack/react-query";
import { getProductSimple } from "../api";

export const useSimpleProducts = () => {
  return useSuspenseQuery({
    queryKey: ["product", "simple"],
    queryFn: () => getProductSimple(),
    staleTime: 10000,
  });
};

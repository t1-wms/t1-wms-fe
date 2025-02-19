import { QueryClient } from "@tanstack/react-query";

export const afterMutate =
  (queryClient: QueryClient, key: string) => async () => {
    await queryClient.invalidateQueries({
      queryKey: [key, "count"],
    });
    setTimeout(() => {
      queryClient.invalidateQueries({
        queryKey: [key],
      });
    }, 0);
  };

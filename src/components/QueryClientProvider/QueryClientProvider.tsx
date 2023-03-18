import { QueryClientProvider } from "@tanstack/react-query";
import { useQueryClient } from "../../common/hooks";
import { FCWithChildren } from "../../common/types/general.types";

export const QueryClientProviderWrapper: FCWithChildren = ({ children }) => {
  const { queryClient } = useQueryClient();
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

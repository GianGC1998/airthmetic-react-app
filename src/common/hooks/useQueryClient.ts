import { QueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { httpStatus } from "./http.constant";
import {
  Location,
  NavigateFunction,
  useLocation,
  useNavigate,
} from "react-router-dom";
import { paths } from "../constants/paths.constants";

const onErrorQuery = (
  error: any,
  navigate: NavigateFunction,
  location: Location
) => {
  if (
    error.response?.status === httpStatus.UNAUTHORIZED &&
    !location.pathname.includes(paths.LOGIN)
  ) {
    navigate(paths.LOGIN);
  }
};
export const useQueryClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            retry: false,
            onError: (error: any) => {
              onErrorQuery(error, navigate, location);
            },
          },
          queries: {
            retry: false,
            structuralSharing: false,
            staleTime: Infinity,
            onError: (error: any) => {
              onErrorQuery(error, navigate, location);
            },
          },
        },
      })
  );
  return { queryClient };
};

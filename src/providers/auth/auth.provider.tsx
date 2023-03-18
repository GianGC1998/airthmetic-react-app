import { useMutation, useQuery } from "@tanstack/react-query";
import { createContext, useCallback, useEffect } from "react";
import { QueryActions } from "../../common/constants/queries.constant";
import { UserEntity } from "../../common/entities";
import { FCWithChildren } from "../../common/types/general.types";
import { ErrorQuery } from "../../common/types/use-query.types";
import {
  removeAuthorizationToken,
  saveAuthorizationToken,
} from "../../common/utils/authorization.utils";
import { login, me } from "../../network/auth.network";
import { LoginResponse, LoginVariables, UseAuth } from "./types";

const initialAuthContext: UseAuth = [
  {
    loggedUserLoading: false,
    loggedUserError: null,
    loggedUser: undefined,
    authenticated: false,
    loginData: undefined,
    loginError: undefined,
    loginLoading: false,
  },
  { revalidateUser: () => void 0, login: () => void 0, logout: () => void 0 },
];

export const AuthContext = createContext<UseAuth>(initialAuthContext);

export const LoggedUserProvider: FCWithChildren = ({ children }) => {
  const { error, data, isLoading, refetch } = useQuery<UserEntity, ErrorQuery>(
    [QueryActions.AUTH_GET_LOGGED],
    me,
    { enabled: false }
  );

  const {
    data: loginData,
    error: loginError,
    isLoading: loginLoading,
    mutate,
    isSuccess,
  } = useMutation<LoginResponse, ErrorQuery, LoginVariables>(
    [QueryActions.AUTH_LOGIN],
    login
  );

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    if (isSuccess) {
      saveAuthorizationToken(loginData.accessToken);
      refetch();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isSuccess, refetch]);

  const loginUser = useCallback(
    (values: LoginVariables) => {
      mutate(values);
    },
    [mutate]
  );

  const logout = useCallback(() => {
    removeAuthorizationToken();
    window.location.reload();
  }, []);

  return (
    <AuthContext.Provider
      value={[
        {
          loggedUser: data as UserEntity,
          loggedUserError: error,
          loggedUserLoading: isLoading,
          authenticated: Boolean(data),
          loginData,
          loginLoading,
          loginError:
            loginError?.response?.data?.message ?? loginError?.message,
        },
        { revalidateUser: () => refetch(), login: loginUser, logout },
      ]}
    >
      {children}
    </AuthContext.Provider>
  );
};

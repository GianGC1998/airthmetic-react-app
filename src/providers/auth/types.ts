import { UserEntity } from "../../common/entities";
import { ErrorQuery } from "../../common/types/use-query.types";

export type UseAuthState = {
  loggedUser: UserEntity | undefined;
  loggedUserError: ErrorQuery | null;
  loggedUserLoading: boolean;
  authenticated: boolean;

  loginData: LoginResponse | undefined;
  loginLoading: boolean;
  loginError: string | undefined;
};

export type UseAuthDispatch = {
  revalidateUser: () => void;
  login: (values: LoginVariables) => void;
  logout: () => void;
};

export type UseAuth = [UseAuthState, UseAuthDispatch];

export type LoginResponse = { accessToken: string; user: UserEntity };

export type LoginVariables = {
  username: string;
  password: string;
};

export type LoggedUserVariables = {
  userId: number;
};

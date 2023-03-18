import { useContext } from "react";

import { UseAuth } from "./types";
import { AuthContext } from "./auth.provider";

export const useAuth = (): UseAuth => {
  const [state, dispatch] = useContext(AuthContext);
  return [state, dispatch];
};

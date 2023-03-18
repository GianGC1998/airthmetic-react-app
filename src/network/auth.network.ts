import { apiUrls } from "../common/constants/apiUrls.constants";
import { apiManager } from "../common/utils";
import { LoginVariables } from "../providers/auth/types";

export const login = async (values: LoginVariables) => {
  const { data } = await apiManager.post(`${apiUrls.AUTH_URL}/login`, {
    data: values,
  });
  return data;
};
export const me = async () => {
  const { data } = await apiManager.get(`${apiUrls.AUTH_URL}/me`);
  return data;
};

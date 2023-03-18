import { localstorageManager } from ".";
import { keys } from "../constants/keys.constants";

export function getAccessToken(): string | null {
  return localstorageManager.getItem(keys.JWT_TOKEN, null);
}

export function saveAuthorizationToken(token: string): void {
  localstorageManager.setItem(keys.JWT_TOKEN, token);
}

export function removeAuthorizationToken(): void {
  localstorageManager.removeItem(keys.JWT_TOKEN);
}

export function getAuthorizationToken(): string {
  let token = localstorageManager.getItem<string>(keys.JWT_TOKEN, "");
  if (!token) token = "";
  const authString = `Bearer ${token}`;
  return authString;
}

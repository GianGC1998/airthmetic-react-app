import { useContext } from "react";

import { NotificationContext } from "./notification.provider";
import { UseNotification } from "./types";

export const useNotification = (): UseNotification => {
  const dispatch = useContext(NotificationContext);
  return dispatch;
};

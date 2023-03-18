import { AlertColor } from "@mui/material/Alert";

export type UseNotificationDispatch = {
  sendNotification: (message: string, type?: AlertColor) => void;
};

export type UseNotification = UseNotificationDispatch;

export type NotificationConfig = {
  open: boolean;
  type: AlertColor;
  message: string;
};

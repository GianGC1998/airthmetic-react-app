import { createContext, useCallback, useState } from "react";
import { FCWithChildren } from "../../common/types/general.types";
import { NotificationConfig, UseNotificationDispatch } from "./types";
import Snackbar from "@mui/material/Snackbar";
import Alert, { AlertColor } from "@mui/material/Alert";

const initialAuthContext: UseNotificationDispatch = {
  sendNotification: (_: string, __: AlertColor = "info") => void 0,
};

const DURATION_TIME = 5000;

export const NotificationContext =
  createContext<UseNotificationDispatch>(initialAuthContext);

export const NotificationProvider: FCWithChildren = ({ children }) => {
  const [notificationConfig, setNotificationConfig] =
    useState<NotificationConfig>({ open: false, type: "info", message: "" });

  const handleClose = (_?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }

    setNotificationConfig((prev) => ({
      ...prev,
      open: false,
    }));
  };

  const sendNotification = useCallback(
    (message: string, type: AlertColor = "info") => {
      setNotificationConfig({
        open: true,
        type,
        message,
      });
    },
    []
  );

  return (
    <NotificationContext.Provider value={{ sendNotification }}>
      <Snackbar
        open={notificationConfig.open}
        autoHideDuration={DURATION_TIME}
        onClose={handleClose}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert onClose={handleClose} severity={notificationConfig.type}>
          {notificationConfig.message}
        </Alert>
      </Snackbar>
      {children}
    </NotificationContext.Provider>
  );
};
